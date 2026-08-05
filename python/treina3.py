import random

qtdimagens=120 #qtd de imagens para treinar
chunks=[[0.0 for x in range(8)]for x in range(qtdimagens)] #array de representacoes numericas das imagens

#carregamento das imagens
for i in range(qtdimagens):
    with open(f"imagens/amostra{i:04d}.jpg","rb")as f:buf=f.read()

    tamanho=len(buf)//8
    for h in range(8):
        for x in range(tamanho):chunks[i][h]+=buf[(h*tamanho)+x]

#inicializa estruturas de dados
weights=[random.random() for x in range(8)]
bias=0.0

for x in range(20000): #ajusta os bias centenas de vezes
    erros=0

    for i in range(80): #cada geracao tem 80 individuos
        alguma=random.randint(0,qtdimagens-1) #escolhe uma imagem qualquer

        somatorio=bias
        for h in range(8):somatorio=somatorio+(weights[h]*chunks[alguma][h])

        degrau=1.0 if somatorio>=0.0 else 0.0
        target=1.0 if alguma<qtdimagens/2 else 0.0
        degrau=target-degrau

        if degrau!=0.0:
            erros=erros+1
            for h in range(8):weights[h]=weights[h]+(0.0001*degrau*chunks[alguma][h]) #ajusta os weights para mais ou para menos de acordo com target-degrau
            bias=bias+(0.0001*degrau)

    print(f"{20000 - x} biasfinal = {bias:.6f}")

    if x%1000==0 and erros==0:break; #o bias foi encontrado

#salva o bias no arquivo
with open('bias2.txt','w')as f:
    for h in range(8):f.write(f"{weights[h]:.12f}\n") #grava no arquivo os weights
    f.write(f"{bias:.12f}\n") #grava no arquivo os bias

print("\nTreinamento finalizado. Pesos salvos em 'bias2.txt'")
