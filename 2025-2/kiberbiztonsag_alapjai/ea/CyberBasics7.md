# Cybersecurity basics

## Introduction to Cryptography

Essentials for Cybersecurity Practitioners

## Cryptography Basics

**What you will learn...**

* What is cryptography and why is it important?  
* Evolution of Cryptography: From Caesar Cipher to Vigenère Cipher and the One-Time Pad (OTP)  
* Key concepts: Encryption, Decryption, and Key Management  
* Types of cryptography: Symmetric vs. Asymmetric  
* Common cryptographic algorithms (e.g., AES, RSA, SHA)  
* Real-world applications of cryptography  
* The role of cryptography in cybersecurity  
* Emerging trends: Quantum cryptography and challenges

## What is Cryptography?

**Understanding the Concept of Cryptography**  
Cryptography is the art and science of securing information by converting it into an unreadable format, ensuring confidentiality, integrity, and authenticity. It enables secure communication in the presence of adversaries by using encryption and decryption techniques. The primary goals of cryptography include:

* Ensuring data confidentiality through encryption.  
* Preserving data integrity against unauthorized alterations.  
* Authenticating the identity of users and systems.  
* Supporting non-repudiation, preventing denial of actions.

## Security by obscurity

- **Security by obscurity**  
Security by obscurity refers to the practice of relying on the secrecy of a system's design, algorithms, or implementation details as the main method of providing security. This approach assumes that if the internal workings remain unknown, the system will be protected from attacks. However, it is widely regarded as a weak security strategy, as true security should not depend solely on keeping system details hidden, but rather on sound, transparent, and well-tested security principles.  
* **Kerckhoff's principle - 1883**  
Kerckhoff's principle is the concept that a cryptographic system should be designed to be secure, even if all its details, except for the key, are publicly known.

## History of Cryptography

## Scytale
  
**Scytale** is a tool used to perform a transposition cipher, consisting of a cylinder with a strip of parchment wound around it on which is written a message.  
![perfect_secrecy](img\08\01.png)
The recipient uses a rod of the **same diameter** on which the parchment is wrapped to read the message.

## Caesar cipher

* Caesar's cipher, is one of the simplest and most widely known encryption techniques.  
* The method is named after Julius Caesar, who used it in his private correspondence.  
* It is a type of **substitution cipher** in which each letter in the plaintext is replaced by a letter some fixed number of positions down the alphabet.
![perfect_secrecy](img\08\02.png)

## Special Caesar cipher: ROT13

* ROT13 is a special case of the Caesar cipher which was developed in ancient Rome  
* ROT13 is a simple letter substitution cipher that replaces a letter with the 13th letter after it in the alphabet.  
* Well known example for a **very weak cipher**
![perfect_secrecy](img\08\03.png)

## Cracking Substitution cipher

**Substitution cipher with unknown shift:**  
`Ch nby niqh qbyly C qum vilh Fcpyx u guh qbi mucfyx ni myu Uhx by nifx om iz bcm fczy Ch nby fuhx iz movgulchym Mi qy mucfyx oj ni nby moh Ncff qy ziohx u myu iz alyyh Uhx qy fcpyx vyhyunb nby qupym Ch iol syZq movgulchy Qy uff fcpy ch u syZq movgulchy SyZq movgulchy, syZq movgulchy Qy uff fcpy ch u syZq movgulchy SyZq movgulchy, syZq movgulchy Uhx iol zlcyhxm uly uff uviulx Guhs gily iz nbyg fcpy hyrn xiil Uhx nby vuhx vyachm ni jfus Qy uff fcpy ch u syZq movgulchy SyZq movgulchy, syZq movgulchy Qy uff fcpy ch u syZq movgulchy SyZq movgulchy, syZq movgulchy ` 
* `What is ETAOIN SHRDLU?`

## Frequency Analysis

**Frequency analysis** is the study of the frequency of letters or groups of letters in a ciphertext.

* Frequency analysis is based on the fact that, in any given stretch of written language, certain letters and combinations of letters occur with varying frequencies  
* In the English language **E, T, A** and **O** are the most common, while **Z, Q, X** and **J** are rare.

![perfect_secrecy](img\08\04.png)
## Vigenère cipher

**Vigenère cipher**  
The Vigenère cipher is a method of encrypting alphabetic text by using a series of different Caesar ciphers, based on the letters of a keyword.

* It is polyalphabetic substitution cipher.  
* First described by Giovan Battista Bellaso in 1553  
* Can not be cracked by a simple frequency analysis

![perfect_secrecy](img\08\05.png)
## Example for Vigenère cipher

The first secret key is: **CARROT**.  
The second secret key is: **SECRET**.  
The third secret key is: **ITISAVERYLONGKEY**.  
**PLAINTEXT** : MY NAME IS NORBERT TIHANYI  
**SECRET KEY**: CA RROT CA RROTCAR ROTCARR  
**CIPHERTEXT**: OY ERAX KS EFFUGRK KWACNPZ

**PLAINTEXT** : MY NAME IS NORBERT TIHANYI  
**SECRET KEY**: SE CRET SE CRETSEC RETSECR  
**CIPHERTEXT**: EC PRQX AW PFVUWVV KMASRAZ

**PLAINTEXT** : MY NAME IS NORBERT TIHANYI  
**SECRET KEY**: IT ISAV ER YLONGKE YITISAV  
**CIPHERTEXT**: UR VSMZ MJ LZFOKBX RQAIFYD

## Frequency Analysis is not working

![perfect_secrecy](img\08\06.png)
*(A Vigenère titkosítás esetén a relatív frekvencia eloszlás kiegyenlítődik, így a klasszikus gyakoriságelemzés nem működik.)*

## Cracking Vigenère cipher

* In 1863, Friedrich **Kasiski** was the first to publish a general method of deciphering Vigenère ciphers.  
* Kasiski method, takes advantage of the fact that repeated words are, by chance, sometimes encrypted using the same key letters, leading to repeated groups in the ciphertext.

Example with secret key: **AZAZ**  
**PLAINTEXT** : NORBERT TIHANYI NORBERT TIHANYI  
**SECRET KEY**: AZAZAZA ZAZAZAZ AZAZAZA ZAZAZAZ  
**CIPHERTEXT**: NNRAEQT SIGAMYH NNRAEQT SIGAMYH

* [https://www.dcode.fr/vigenere-cipher](https://www.dcode.fr/vigenere-cipher)

## Vernam Cipher

* Invented in 1917 by Gilbert S. Vernam  
* It is a polyalphabetic stream cipher.  
* The key length is the same size as the message.  
* In modern terminology, a Vernam cipher is a symmetrical stream cipher in which the plaintext is combined with a random or pseudorandom stream of data (the "keystream") of the same length, to generate the ciphertext, using the Boolean "exclusive or" (XOR) function

## Perfect Secrecy

**Is there a perfect secrecy?**  
Perfect means: The encryption scheme is unbreakable with
* unlimited time  
* unlimited computational power
![perfect_secrecy](img\08\07.png)

## Perfect Secrecy

A cryptosystem has perfect secrecy if for any message `x` and any encipherment `y` 
`P(x|y) = P(x)` 
**In other words, the message gives the adversary precisely no information about the message contents.**

## OTP - The unbreakable encryption

In **1949 Claude Shannon** proved that there is a **perfect** and **unbreakable** secrecy. This encryption technique is the so-called OTP (One Time Pad, successor of Vernam cipher). Shannon proved that OTP encryption is unbreakable if and only if:

* **plaintext and secret key is of the same size**
* the secret key has been used only once  
* it is assumed that the attacker has no other information about the key  
* secret key has the same character set than the plaintext  
* **the secret key is true random**

**NOTE:** In its original form, Vernam's system was vulnerable because the key tape was a loop, which was reused whenever the loop made a full cycle.

## Example for Perfect encryption

Different random keys generate the same ciphertext.  
Observing only the ciphertext, there is no additional information about the plaintext.  

PLAINTEXT : 0xFFFFFFFF  
SECRET KEY: 0x34627362   ← random key
CIPHERTEXT: 0xC59D1C9F  ← ciphertext

PLAINTEXT : 0x11111111  
SECRET KEY: 0xD48C0D8E  ← random key
CIPHERTEXT: 0xC59D1C9F  ← same ciphertext

PLAINTEXT : 0xA0A0A0A0  
SECRET KEY: 0x653DBC3F  ← random key
CIPHERTEXT: 0xC59D1C9F  ← same ciphertext

## Primary Categories of Modern Cryptography

![Symmetric-key](img\08\08.png)

* **Symmetric Cryptography:** Uses a single shared key for both encryption and decryption. Both parties must have access to the same secret key, which must be exchanged securely.  
* **Asymmetric Cryptography:** Utilizes a pair of keys: a public key for encryption and a private key for decryption. The public key can be openly distributed, while the private key remains confidential.  
* **Hash Functions:** Do not use keys. Instead, they produce a fixed-length hash value from input data. Hash functions are one-way and are commonly used for data integrity and password storage.

## Symmetric-key encryption

**Symmetric-key encryption** is a type of encryption where only one key (a secret key) is used to both encrypt and decrypt electronic information.

![Symmetric-key](img\08\09.png)

* Anyone who knows the secret key can decrypt the secret message.  
* With symmetric-key encryption, the encryption key can be calculated from the decryption key, and vice versa.

## Stream ciphers and Block ciphers

Symmetric-key encryption can use either **stream ciphers or block ciphers.**  
- **Block ciphers**  
Block ciphers take a number of bits (typically 64, 128 or 256 bits long) and encrypt them as a single unit, padding the plaintext so that it is a multiple of the block size.  
- **Stream ciphers**  
Stream ciphers encrypt the digits (typically bytes), or letters (in substitution ciphers) of a message one at a time

## Data Encryption Standard - DES

* 1976: DES is approved as a standard, first published in 1977  
* based on an earlier design by Horst Feistel  
* block size: 64 bits  
* key size: 56 bits  
* **Today DES considered as an insecure algorithm**  
* SciEngines reported on July 15th 2008 to break DES in an average time of a single day using a setup of COPACOBANA.  
* In 2016 the Open Source password cracking software **hashcat** added in DES brute force searching on general purpose GPUs.  
* Systems have been built with eight GTX 1080 Ti GPUs which can recover a key in an average of under 2 days  
* crack.sh : 48 Xilinx Virtex-6 LX240T FPGAs. - 26 hours

## Advanced Encryption Standard - AES

* AES was announced by National Institute of Standards and Technology (NIST) on November 26, 2001.  
* Originally published as Rijndael (Joan Daemen and Vincent Rijmen)  
* FIPS PUB 197: Advanced Encryption Standard (AES)  
* block size: 128 bits  
* three different key lengths: 128, 192 and 256 bits.  
* **Today AES considered as a secure algorithm**  
* For AES-128, the key can be recovered with a computational complexity of 2^126.1 using the biclique attack. (this is not practical attack)  
* Related-key attacks can break AES-256 and AES-192 with complexities 2^99.5 and 2^176 in both time and data, respectively.

## The AES SubBytes step

In the SubBytes step, each byte `a i,j ` in the state array is replaced with a SubByte `S(a i,j )` using an 8-bit substitution box. **This operation provides the non-linearity in the cipher.**
![AES_ShiftRows](img\08\10.png)

## The AES ShiftRows step

The ShiftRows step operates on the rows of the state; it cyclically shifts the bytes in each row by a certain offset.
![AES_ShiftRows](img\08\11.png)

## The AES MixColumns step

In the MixColumns step, the four bytes of each column of the state are combined using an invertible linear transformation. **Together with ShiftRows, MixColumns provides diffusion in the cipher.**
![AES_MixColumns](img\08\12.png)

## AES is unbreakable as of 2026

As of 2026, AES is regarded as a secure encryption algorithm. When **properly implemented**, there are no known practical attacks that enable an unauthorized party to decrypt AES-encrypted data without access to the key.

## Shannon's properties

**Confusion** and **diffusion** are two properties of the operation of a secure cipher described by **Claude E. Shannon** in 1945. 
- **Confusion**  
Confusion means that each binary digit (bit) of the ciphertext should depend on several parts of the key, obscuring the connections between the two.  
- **Diffusion**  
Diffusion means that if we change a single bit of the plaintext, then (statistically) half of the bits in the ciphertext should change, and similarly, if we change one bit of the ciphertext, then approximately one half of the plaintext bits should change.

## Confusion & Diffusion

* The idea of diffusion is to **hide the relationship between the ciphertext and the plain text.** 
* The property of confusion **hides the relationship between the ciphertext and the key** 

![diffusion_confusion_cipher](img\08\13.png)

## Public Key Cryptography

## The Key distribution problem

Alice wants to send a secret to Bob, but they don't share a common key

![alice_bob_exchange](img\08\14.png)

* Alice can't send the key with the box (In this case the key would be compromised)  
* The key is uniqe, and Bob does not have Alices's key

## Secure Communication via insecure channel

![alice_bob_insecure](img\08\15.png)
* Alice puts a secret in a box, which she locks with her own lock.  
* Bob adds his own lock to this box, so that now the box has two locks.  
* Alice, knowing that the box is secure with Bob's lock, then takes her own lock off the box (with her key).  
* Bob then removes his lock and receives the secret

## Diffie-Hellman Key Exchange Protocol

**Diffie-Hellman Key Exchange**  
In a groundbreaking 1976 paper, Whitfield Diffie and Martin E. Hellman proposed a method for securely exchanging a symmetric key over a public channel. This method became known as the Diffie-Hellman key exchange protocol.

## The RSA algorithm

The **RSA algorithm** is invented in 1977 by Ron Rivest, Adi Shamir and Leonard Adleman. RSA is the most common asymmetric cryptosystem nowadays. The RSA algorithm involves four steps: key generation, key distribution, encryption, and decryption.  

**Key generation process:**
* Choose two distinct prime numbers `p` and `q`.  
* Let `N = p · q`
* Calculate the `φ ` function. `φ(N) = (p − 1)(q − 1`  
* Choose an odd `e ∈ N`, such that `1 < e < φ(N)`, and `gcd(φ(N), e) = 1`  
* Calculate the multiplicative inverse of `e mod φ(N)`, so calculate `ed=1 mod φ(N)`. We note that `d` can be computed efficiently by using the Extended Euclidean algorithm  
* The secret key is `(d,N)` and the public key is `(e,N)`

## Factoring large numbers - The Security of RSA
Jevons wrote in his 1874 book Principles of Science (p. 123):
`”Can the reader say what two numbers multiplied together will pro-
duce the number 8,616,460,799? I think it unlikely that anyone but
myself will ever know. ”`
![jevson_num](img\08\16.png)

## Factoring large numbers - The Jevons number

Jevons wrote in his 1874 book Principles of Science (p. 123)
![jevson_num](img\08\17.png)

8616460799 = 89681 × 96079

Today one can factor this number less then 10 ms using a normal computer
![jevson](img\08\18.png)

## What about a 256 bit RSA N modulus?
Is 256 bit RSA N modulus safe?
- Let P and Q be two 128 bits prime number.
- Calculate the 256-bit modulus N=P*Q.
- Can we factor this number using a normal computer?

```
17052794333575516881864839152994944471304637238973614249054730990058889762213
```

## Factorization of 256 bit RSA

One can factor a 256 bit N modulus within a few minutes:  
![256bit_rsa](img\08\19.png)

## What about larger numbers? 2048 bit RSA

* Let `P` and `Q` be two random `1024` bit prime number.  
* Calculate the `2048`-bit modulus `N = P*Q`.  
* **It would take millions of years to factorize this number.**
```
2424029818217249305011434879653836416680952542806599426631848852422
4014393314332247466085313856372921708613038598450567631412378815200
6993677584603843333807930693803404043444168013370096562990336516317
6562511623795718196532111034910456855100456383456383107206519906440
1950148324796347813135687031539922503376997505127928891424343245883
8111213015639644207746363099801357615605193408457001736364180530647
3793889830779695998609519450236380950138091985079397585658699604063
9673924605089354364245295195973558024128231235076056430512647600540
5068240082052518920006037517494099399273718311916611847821945980944
66603494886371
```