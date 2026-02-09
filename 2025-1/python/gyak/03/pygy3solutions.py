import random #3.2
import math #3.6, 3.7
import sys #3.11

#3.1
def is_leap_year(year : int) -> bool:
    """Decides if the given year is a leap year or not"""
    return year % 400 == 0 or (year % 4 == 0 and year % 100 != 0)

#3.2
def number_guesser(interval_bot : int, interval_top : int) -> None:
    """Generates a random number in the given interval,
    asks until number is guessed"""

    rand_num = random.randint(interval_bot, interval_top)
    user_guess = int(input("A tipped a számra: "))

    while user_guess != rand_num:

        print("Nem talált!")

        if user_guess < rand_num:
            print("A tipp kisebb, mint a gondolt szám!")
        elif user_guess > rand_num:
            print("A tipp nagyobb, mint a gondolt szám!")

        user_guess = int(input("A következő tipped a számra: "))

    print(f"Kitaláltad! A szám a {rand_num} volt!")

#number_guesser(1,11)

#3.3
lst = [1, 2, 1, 2, 3, 3, 3, 2, 1, 2, 4, 5, 13, 5, 6]
unique_lst = []
for x in lst:
    if x not in unique_lst:
        unique_lst.append(x)

#3.4a
def caesar_encode(word : str, shift_num : int, shift_direction : str) -> str:
    """Encodes a word based on the Caesar encoding, 
    given the shift and direction"""

    if shift_num <= 0 or shift_num > 26:
        shift_num %= 26 #ABC-beli maradjon

    shift_dir_multiplier = 1
    if shift_direction.lower() == "left":
        shift_dir_multiplier = -1
    elif shift_direction.lower() == "right":
        pass
    else:
        print("Hibás irány! Használd a left vagy right szót!")
        return

    #kell: ord(), chr()
    # ord() - ASCII kódba vált át
    # chr() - ASCII kódból vált át
    encoded = ""
    for letter in word:

        if not letter.isalpha(): # ha írásjel, vagy szám
            continue #következő iteráció

        letter = letter.upper() #egységesítve
        code = ord(letter) + shift_num * shift_dir_multiplier #balra/jobbra szorzó

        if code > ord("Z"):
            code -= 26 #26 betűs az ABC
        elif code < ord("A"):
            code += 26
        
        encoded += chr(code)

    return encoded

#print(caesar_encode("ama", 27, "right"))
#print(caesar_encode("ama", 27, "left"))

#3.4b
def caesar_decode(word : str) -> None:
    for i in range(1, 27): # összes kódolással kipróbáljuk
        decoded = ""
        for letter in word:
            if not letter.isalpha():
                decoded += letter
                continue
            d_code = ord(letter) - i

            if d_code > ord("Z"):
                d_code -= 26 #26 betűs az ABC

            elif d_code < ord("A"):
                d_code += 26

            decoded += chr(d_code)

        print(i, decoded)

#caesar_decode(f"{caesar_encode("one", 1, "right")} {caesar_encode("two", 2, "right")} {caesar_encode("three", 3, "right")} {caesar_encode("four", 4, "right")} {caesar_encode("five", 5, "right")} {caesar_encode("five", 25, "right")}")

#3.5
files = ["py.py", "py.py.txt", "hello.docx", "music.json", "names.txt", "doctor_x.xlsx", "voorhees.json"]
def get_extension(file : str) -> str:
    """Gets the file's extension, returns empty string if not successful"""

    extension = ""
    for i in range(len(file)-1, 0, -1):
        extension += file[i]
        if file[i] == ".":
            return extension[::-1] #mivel hátulról adogattuk hozzá
            #return extension[::-1].strip(".") # ha nem akarjuk a .-ot
    
    if extension == file:
        print("Nem található kiterjesztés!"); return ""

def group_files(files: list) -> dict:
    """Groups files by their file extensions"""
    file_dictionary = dict()
    for file in files:
        if get_extension(file) not in file_dictionary:
            file_dictionary[get_extension(file)] = [file]
        else:
            file_dictionary[get_extension(file)].append(file)
    return file_dictionary

def count_extensions(file_dictionary : dict) -> dict:
    """Counts the extensions stored in a dictionary"""
    for key, value in file_dictionary.items():
        print(key, len(value))

#print(group_files(files)); count_extensions(group_files(files))

#3.6
def degrees_to_rad(deg) -> float:
    """Convert degrees to radians"""
    return math.radians(deg)

#print(degrees_to_rad(180))

def deg_to_rad_add(deg):
    """Stores given degrees"""
    stored_degrees = deg
    def to_rad(added_degrees):
        """Adds degrees to the stored value then converts it to radians"""
        nonlocal stored_degrees
        stored_degrees += added_degrees
        stored_degrees %= 360 #így [0, 2PI] közötti lesz
        return math.radians(stored_degrees)
    return to_rad

acc_degrees = deg_to_rad_add(360)
#print(type(acc_degrees))
#print(acc_degrees(180))

def jaccard_index(set1 : set, set2: set) -> float:
    """Calculates the similarity between two sets"""
    intersect_size = len(set1 | set2)
    union_size = len(set1 & set2)
    return 0. if union_size == 0 else intersect_size / union_size

A = {1,2,3,4}
B = {1,2}
#print(jaccard_index(set(), B))
#print(jaccard_index(A, B))

#3.9
def fib(n : int) -> list:
    """Calculates the first n Fibonacci number"""
    if n <= 0:
        return []
    elif n == 1:
        return [0]
    
    fib_nums = [0, 1]
    while len(fib_nums) < n:
        fib_nums.append(fib_nums[-1] + fib_nums[-2])

    return fib_nums

#print(fib(1000))

#3.10
matrix = [ [1,2,3], [4,5,6], [7,8,9] ]
#print([x for row in matrix for x in row])

#**3.11**
qs = lambda list: qs([x for x in list[1:] if x <= list[0]]) + [list[0]] + qs([x for x in list if x > list[0]]) if list else []
# első elem lesz a pivot - rekurzívan a nála kisebb-egyenlőek balra, majd a nála nagyobbak jobbra - végén összefűzzük
# vagy ha üres a lista - üres lista, ne legyen IndexError

#print(qs([4214,214,215,1,2,51,51,56,1,5543,66,34,5234,52322]))

#3.12
# lst = [range(10**10000), list(range(10**7)), 4, 256, 257, 100000, 2147483648, 9999999999999, 6.0, "", "a", [], ["a"], [1, 2, 3], [1, 2, 3, 4], set(), dict(), tuple(), (1,), True, None]
# for i in range(0, len(lst)):
#     print(i, sys.getsizeof(lst[i]))