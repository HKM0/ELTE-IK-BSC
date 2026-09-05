# Cybersecurity Basics
## Malware and Antivirus
---
## **What you will learn...**
* What is malware?
* What types of malware are there?
* How does malware spread?
* How can we stop malware?
* What is antivirus?
* How did antivirus evolve over time?
* What are some advanced techniques used by malware authors and antivirus vendors?

## **Definitions**
* **Definition: Malware:** Malicious software designed to harm or exploit devices or networks.
* **Definition: Antivirus:** Software designed to detect, prevent, and remove malware.

*It is important to note, that most malware and antivirus now operates in a completely automated way, without manual human commands.*

## **Malware types**
By definition, malware operates on devices without the approval of its owner, performing actions not in line with the owner's wishes. However, there are many different types of malware based both on what they try to achieve as well as the type of technological tricks they use.

* **Virus:** Viruses embed malicious code into host files, regular files used by the operating system. They also typically have self-replicating functionality, meaning they can "infect" other files by embedding themselves into them. This terminology comes from the biological concept of a virus as its behavior is analogous to it. The first concept was designed by John Von Neumann, who is considered the father of computer virology.
* **Worm:** Similar to viruses in that they spread by replicating themselves, typically by scanning for and finding other systems with a network based security vulnerability. However, they do not rely on a host file. The first computer worm is accepted to be Creeper by Ray Tomlinson, which was a "payloadless" worm. This also gave birth to Reaper, the first known antivirus software.
* **Trojan:** A trojan or trojan horse is a computer software that disguises its true nature by pretending to be something else. Unlike viruses and worms, there is no replication involved, but a trojan can disguise any kind of malicious operation such as installing backdoors.
* **Ransomware:** Software that performs extortion, typically by encrypting a user's files and demanding a ransom for the decryption key. Payment is often demanded via untraceable methods such as digital currencies. The attack itself can be carried out by a trojan, but in some cases, by exploiting network vulnerabilities automatically (e.g. WannaCry).
* **Spyware:** The purpose of spyware is to remain hidden indefinitely while collecting as much information about the system as possible. This is directly opposed to ransomware which the user learns about immediately.
* **Adware:** Some software only shows the user advertisements continuously, but can not be removed regularly. This sort of software is also considered malicious.
* **Scareware:** Scareware is malicious software that attempts to shock and scare users into performing some additional action. A typical example is fake antivirus popups that attempt to coerce the user into purchasing and installing some antivirus software.
* **Rootkit:** A rootkit is a bundle of different software pieces that is designed to estabilish remote access to a computer system. Rootkits can be installed manually after successful exploitation or in an automated way through a vulnerability.
* **RAT (remote access trojan):** RATs are software designed to enable remote control over a system without the knowledge of the system's owner.

## **Infection vectors**
How does malware spread? Depends heavily on the type of malware, but some common methods include:
* Social engineering
* Removable drives
* Unverified downloads and installs
* Network vulnerabilities

## **Malware examples - Virus - CIH**
![cih_virus](img\12\01.png)
* Also known as Chernobyl or Spacefiller from 1998.
* It was designed to infect `.exe` files on 9x Windows.
* The payload was scheduled to trigger on April 26.
* When triggered, it would attempt to perform a number of harmful operations. If successful, affected computers could no longer be restarted and could only be fixed by hardware being replaced.

## **Malware examples - Worm - ILOVEYOU**
![iloveyou_worm](img\12\02.png)
* Also known as Love Bug or Loveletter from 2000.
* Was using an attachment called "LOVE-LETTER-FOR-YOU.TXT.vbs".
* Opening the attachment runs the script which sends the same email with the same attachment to every address in the address book of the user in Outlook.
* It is estimated that over 10% of internet connected devices were infected, causing billions of dollars of damage.
* The author of the worm did not face prosecution.

## **Malware examples - Ransomware - WannaCry**
![wannacry_ransomware](img\12\03.png)
* Used sophisticated exploit code for SMB to spread over the network.
* Demanded payments via bitcoin.
* Provided support and explanation for recovering files.
* Several key sectors were hit, famously the NHS had to postpone operations as equipment was not working reliably.

## **Antivirus techniques**
Due to the nature of malware spreading exponentially on its own, a new class of defensive software was introduced to preemptively prepare for such attacks.
* **Signatures:** Traditional AV products heavily relied on signature based detection, where they use a large database of signatures, each signature aiming to match a certain specific malware.
* **Sandbox execution:** AV products often execute the analyzed software in a sandbox, a virtualized environment in order to try and decide its intention without risking real compromise.
* **Heuristic detection:** More modern detection mechanisms aim to find malware by creating more generic signatures so that several different strains or variants are matched.
* **Real-time protection:** Most modern AV products perform detection continuously on open files, running processes, programs being installed etc.
* **Threat intelligence:** Modern AV products do not only focus on threats present on the system but also rely on information about active threats at any time. Information is made available to the engine about emerging threats, types of ongoing attacks and likely vectors.
* **Anomaly detection:** A newer approach to malware detection is to rather than relying on signatures, build a profile of the system and detect anomalies, differences from normal operations.

## **Antivirus challenges, bypass techniques**
While AV developers work on more and more reliable detection methods, malware authors do their very best to come up with clever ways of bypassing detection.
* **Zero days:** For traditional antivirus software, the biggest problem has always been zero day exploits. Signature based systems are useless if there is no signature of the attack. For signature based detection, keeping the database up-to-date is a huge, time-sensitive challenge.
* **Sandbox bypasses:** Attackers can employ some tricks to convince the AV, the software is harmless, for example performing innocous tasks for a long time to exhaust the time limit of the sandbox or build in sandbox detection to the malware.
* **Polymorphism:** Polymorphism means that a software changes its own code every time it runs, but maintains its semantics. This makes signature based detection very difficult.
* **Metamorphism:** Metamorphic code is similar to a quine, but instead of creating an exact replica of itself, it creates a functionally equivalent, but syntactically different version. This is even more advanced than polymorphism, since it also rewrites the metamorphic engine. Neither protect against heuristic analysis or anomaly detection techniques.
* **Fileless execution:** Sophisticated malware often does not ever write to disk but rather operates entirely in memory. This makes long term persistance much more difficult as the state of the malware might not be preserved, but can often be extremely difficult to detect.
* **Code obfuscation and packing:** When researchers try to analyze malware samples, they attempt to reconstruct the logic and structure of the malware to try to understand it better. Malware authors use a series of techniques to make this as difficult as possible such as encrypting, scrambling or otherwise concealing the true code.
* **Social engineering:** Antivirus products can be turned off and they allow for override. If a social engineer is able to convince a user to do either, the protection is bypassed.

## **Public resources - Virustotal**
* A free online service that analyzes suspicious files, URLs, domains, and IPs.
* Scans inputs using 70+ antivirus engines and tools.
* Also has support for dynamic analysis in sandbox environments.
* Shows historical reports, submissions, and community feedback.

**Clean scan**  
![virustotal_clean_scan](img\12\04.png)

**Suspicious scan**  
![virustotal_suspicious_scan](img\12\05.png)

## **Malware attribution - APT groups**
* The term APT group means "Advanced Persistent Threat".
* State-sponsored or highly organized hacking groups that conduct prolonged and targeted cyberattacks.
* Their goals often include espionage, data theft, sabotage, or political influence, rather than financial gain.
* Use custom malware, zero-day exploits, and social engineering tailored to specific targets.
* Often attributed to nation-states (e.g., APT28/Russia, APT41/China, APT38/North Korea).
* The use of certain malware families are often associated with particular APTs.