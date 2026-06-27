import json
import random



def questions(job, difficulty):
    fields = {
        1: "aiml",
        2: "cloudcomputing",
        3: "cybersecurity",
        4: "frontend",
        5: "backend",
        6: "dsa",
        7: "dbms",
        8: "operating_system",
        9: "software_engineering",
        10: "quantum_computing"
}

    questions = {}

    with open(f"resources/questions/personality.json", "r") as file:
        data_personality = json.load(file)
        question_1 = data_personality["mustask"]
        question_2 = random.choice(data_personality["question"])
        question_3 = random.choice(data_personality["question"])
        while question_3 == question_2:
            question_3 = random.choice(data_personality["question"])
        
    with open("resources/questions/basic.json", "r") as file:
        data_basic = json.load(file)
        question_4 = random.choice(data_basic["question"])
        question_5 = random.choice(data_basic["question"])
        while question_4 == question_5:
                question_5 = random.choice(data_basic["question"])

    if job in {1,2,3,4,5,6,7,8,9,10,11}:
        with open(f"resources/questions/{fields[job]}.json", "r") as file:
                data = json.load(file)
                question_6 = random.choice(data["fundamental"])
                question_7 = random.choice(data["fundamental"])
                while question_6 == question_7:
                    question_7 = random.choice(data["fundamental"])
                    

                if difficulty == "B" :
                    question_8 = random.choice(data["easy"])
                    question_9 = random.choice(data["easy"])
                    while question_8 == question_9:
                        question_9 = random.choice(data["easy"])
                    question_10 = random.choice(data["easy"])
                    while question_10 in [question_8, question_9]:
                        question_10 = random.choice(data["easy"])
                    question_11 = random.choice(data["medium"])
                    question_12 = random.choice(data["medium"])
                    while question_11 == question_12:
                        question_12 = random.choice(data["medium"])


                
                    question_13 = random.choice(data["hard"])
                    question_14 = random.choice(data["hard"])
                    while question_13 == question_14:
                        question_14 = random.choice(data["hard"])
                    
                    q_list_b = [
                        question_1, question_2, question_3, question_4,
                        question_5, question_6, question_7, question_8,
                        question_9, question_10, question_11, question_12,
                        question_13, question_14]

                    questions = {"Allquestion" : q_list_b}
                    
                elif difficulty == "I" :
                    question_8 = random.choice(data["easy"])
                    question_9 = random.choice(data["medium"])
                    question_10 = random.choice(data["medium"])
                    while question_9 == question_10:
                        question_10 = random.choice(data["medium"])
                    question_11 = random.choice(data["medium"])
                    while question_11 in [question_10, question_9]:
                        question_11 = random.choice(data["medium"])
                    question_12 = random.choice(data["medium"])
                    while question_12 in [question_10, question_9, question_11]:
                        question_12 = random.choice(data["medium"])
                    question_13 = random.choice(data["medium"])
                    while question_13 in [question_10, question_9, question_11, question_12]:
                        question_13 = random.choice(data["medium"])
                    question_14 = random.choice(data["hard"])
                    question_15 = random.choice(data["hard"])
                    while question_15 == question_14:
                        question_15 = random.choice(data["hard"])
                    question_16 = random.choice(data["hard"])
                    while question_16 in [question_15, question_14]:
                        question_16 = random.choice(data["hard"])
                    q_list_i = [
                    question_1, question_2, question_3, question_4,
                    question_5, question_6, question_7, question_8,
                    question_9, question_10, question_11, question_12,
                    question_13, question_14, question_15, question_16]

                    questions = {"Allquestion" : q_list_i}
                        
                elif difficulty == "E" :
                    question_8 = random.choice(data["easy"])
                    question_9 = random.choice(data["medium"])
                    question_10 = random.choice(data["medium"])
                    while question_9 == question_10:
                        question_10 = random.choice(data["medium"])
                    question_11 = random.choice(data["medium"])
                    while question_11 in [question_10, question_9]:
                        question_11 = random.choice(data["medium"])
                    question_12 = random.choice(data["hard"])
                    question_13 = random.choice(data["hard"])
                    while question_12 == question_13:
                        question_13 = random.choice(data["hard"])
                    question_14 = random.choice(data["hard"])
                    while question_14 in [question_12, question_13]:
                        question_14 = random.choice(data["hard"])
                    question_15 = random.choice(data["hard"])
                    while question_15 in [question_12, question_13, question_14]:
                        question_15 = random.choice(data["hard"])
                    question_16 = random.choice(data["hard"])
                    while question_16 in [question_12, question_13, question_15]:
                        question_16 = random.choice(data["hard"])
                        
                    q_list_e = [
                    question_1, question_2, question_3, question_4,
                    question_5, question_6, question_7, question_8,
                    question_9, question_10, question_11, question_12,
                    question_13, question_14, question_15, question_16]

                    questions = {"Allquestion" : q_list_e}
                        
                        
                return questions
            
                   
    else:
        return None