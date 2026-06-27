from argon2 import PasswordHasher
ph = PasswordHasher()

def hashing_password(key):
    password_hashed = ph.hash(key)
    return password_hashed
    
def verify_password(key, input):
    try:
        return ph.verify(key, input)
    except Exception:
        return False