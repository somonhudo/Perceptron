import random

frutas=[]

#25 laranjas
for x in range(25):
    especie='l'
    peso=0.082+random.random()/100 #entre 0.082 e 0.092
    frutas.append(f"{peso} {especie}")

#25 frutas qualquer
for x in range(25):
    especie='q'
    peso=random.random()*2 #entre 0 e 2
    frutas.append(f"{peso} {especie}")

#salva no arquivo
with open('entradas1.txt','w')as f:f.write('\n'.join(frutas))

with open("entradas1.txt","r")as f:
    for line in f:
        parts=line.strip().split()

        if parts[1]=='l':print(f"{float(parts[0]):.6f} laranja")
        else: print(f"{float(parts[0]):.6f} fruta qualquer")
