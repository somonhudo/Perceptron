import random

with open("entradas2.txt","w") as f:
    #30 laranjas
    for x in range(30):
        especie='l'
        peso=0.8+random.random()/10.0 #entre 0.8 e 0.9
        volume=0.7+random.random()/10.0 #entre 0.7 e 0.8
        cor=0.6+random.random()/10.0 #entre 0.6 e 0.7
        posicao=0.5+random.random()/10.0 #entre 0.5 e 0.6
        textura=0.4+random.random()/10.0 #entre 0.4 e 0.5
        consistencia=0.3+random.random()/10.0 #entre 0.3 e 0.4
        temperatura=0.2+random.random()/10.0 #entre 0.2 e 0.3
        idade=0.1+random.random()/10.0 #entre 0.1 e 0.2
        f.write(f"{peso} {volume} {cor} {posicao} {textura} {consistencia} {temperatura} {idade} {especie}\n")
    #30 frutas quaisquer
    for x in range(30):
        especie='q'
        peso=random.random()*2.0 #entre 0 e 2
        volume=random.random()*2.0 #entre 0 e 2
        cor=random.random()*2.0 #entre 0 e 2
        posicao=random.random()*2.0 #entre 0 e 2
        textura=random.random()*2.0 #entre 0 e 2
        consistencia=random.random()*2.0 #entre 0 e 2
        temperatura=random.random()*2.0 #entre 0 e 2
        idade=random.random()*2.0 #entre 0 e 2
        f.write(f"{peso} {volume} {cor} {posicao} {textura} {consistencia} {temperatura} {idade} {especie}\n")

with open("entradas2.txt","r")as f:
    for line in f:
        parts=line.strip().split()
        inputs=[float(parts[i]) for i in range(8)]

        if parts[8]=='l':parts[8]='laranja'
        else: parts[8]='fruta qualquer'

        print(f"{inputs[0]:.6f} {inputs[1]:.6f} {inputs[2]:.6f} {inputs[3]:.6f} {inputs[4]:.6f} {inputs[5]:.6f} {inputs[6]:.6f} {inputs[7]:.6f} {parts[8]}")
