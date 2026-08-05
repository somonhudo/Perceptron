import random

qtdimagens=120 #qtd de imagens para comparar
chunks=[[0.0 for x in range(8)]for x in range(qtdimagens)] #array de representacoes numericas das imagens

#carregamento das imagens
for i in range(qtdimagens):
    with open(f"imagens/amostra{i:04d}.jpg","rb")as f:buf=f.read()
        
    tamanho=len(buf)//8
    for h in range(8):
        for x in range(tamanho):chunks[i][h]+=buf[(h*tamanho)+x]


#buscando dados no arquivo texto
vals=[]
with open("bias2.txt","r")as f:
    for line in f:
        vals.append(float(line.strip()))
weights=[0.0 for x in range(8)]
for h in range(8):weights[h]=vals[h];
bias=vals[8]

#contabilizando acertos e erros
circulocerto=circuloerrado=quadradocerto=quadradoerrado=0

#testa a inteligencia artificial com 1000 predições aleatórias
for x in range(1000):
    alguma=random.randint(0,qtdimagens-1) #escolhe uma imagem qualquer

    somatorio=bias
    for h in range(8):somatorio+=chunks[alguma][h]*weights[h]

    if alguma<qtdimagens/2: #se a imagem contem um circulo
        if somatorio>0:
            circulocerto=circulocerto+1
        else:
            circuloerrado=circuloerrado+1
    if alguma>qtdimagens/2: #se a imagem contem um quadrado
        if somatorio<0:
            quadradocerto=quadradocerto+1
        else:
            quadradoerrado=quadradoerrado+1

print(f"\nEsperado circulo dado circulo: {circulocerto}")
print(f"Esperado circulo dado quadrado: {circuloerrado}")
print(f"Esperado quadrado dado quadrado: {quadradocerto}")
print(f"Esperado quadrado dado circulo: {quadradoerrado}\n")
