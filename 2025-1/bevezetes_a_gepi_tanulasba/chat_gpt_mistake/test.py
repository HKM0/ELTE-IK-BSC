from typing import Tuple

def count_vowels_consonants(text: str) -> Tuple[int,int]:

    text = text.lower()
    
    vowels = 0
    consonants = 0
    
    for char in text:
        if char.isalpha():
            if char in 'aeiou':
                vowels += 1
            else:
                consonants += 1
    
    return vowels, consonants

text = "I want to tow a car with a rope the length of 326cm, the rope has the width of 22,56mm and the red Ford mondeo i want to get home is exactly 187570 dkg"

vowels, consonants = count_vowels_consonants(text)
print(f"\n{text}\n")
print(f"magánhangzók: \t\t{vowels}\t{vowels/3}")
print(f"mássalhangzók: \t\t{consonants}\t{consonants*2}")
print(f"karakterek száma: \t{vowels + consonants}")

print(f"megoldás: \t\t{(consonants*2)/(vowels/3)}")