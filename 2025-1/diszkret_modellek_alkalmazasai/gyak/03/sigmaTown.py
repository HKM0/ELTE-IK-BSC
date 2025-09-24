def num_of_divisors(a):
    return sum(1 for i in range(1, a+1) if a % i == 0)

def sum_of_divisors(a):
    return sum(i for i in range(1, a+1) if a % i == 0)

#test
try:
    for tc in range(2,100):
        assert num_of_divisors(tc) == sigma(tc,0)
        assert sum_of_divisors(tc) == sigma(tc,1)
except AssertionError:
    print("Test failed for ", tc)
else:
    print("Ok")
