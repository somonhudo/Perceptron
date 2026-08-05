import random

inputs=[]
target=[]
#busca os valores no arquivo entradas2.txt
with open("entradas2.txt","r") as f:
    for line in f:
        parts=line.split()
        inputs.append([float(parts[i])for i in range(8)])
        target.append(1.0 if parts[8]=='l' else 0.0)

#inicializa estruturas de dados
weights=[random.random() for _ in range(8)]
bias=0.0

for x in range(200000): #ajusta os bias centenas de vezes
    erros=0

    for i in range(100): #cada geracao tem 100 individuos
        alguma=int(random.random()*60) #escolhe uma fruta qualquer

        somatorio=bias
        for h in range(8):somatorio=somatorio+(weights[h]*inputs[alguma][h])

        degrau=1.0 if somatorio>=0.0 else 0.0
        degrau=target[alguma]-degrau

        if degrau!=0.0:
            erros=erros+1
            for h in range(8):weights[h]=weights[h]+(0.000004*degrau*inputs[alguma][h]) #ajusta os weights para mais ou para menos de acordo com target-degrau
            bias=bias+(0.000004*degrau)

    print(f"{200000-x} biasfinal = {bias:.6f}")

    if x%10000==0 and erros==0:break; #o bias foi encontrado

#salva o bias e weights
with open("bias1.txt", "w")as f:
    for h in range(8):f.write(f"{weights[h]:.12f}\n") #grava no arquivo os weights
    f.write(f"{bias:.12f}\n") #grava no arquivo os bias

print("\nTreinamento finalizado. Pesos salvos em 'bias1.txt'")
