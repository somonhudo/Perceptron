import random

dataset=[]
#busca os valores no arquivo e armazena em um array 'dataset'
with open("entradas1.txt","r") as f:
    for line in f:
        peso,especie=line.split(' ')
        dataset.append({'peso':float(peso),'especie':especie})

#inicializa o bias com um valor aleatorio
bias=random.random() #valor entre 0 e 1

for x in range(4000): #ajusta o bias centenas de vezes
    alguma=dataset[random.randint(0,24)] #escolhe uma laranja qualquer

    if alguma['peso']>bias:bias+=bias*0.01 #ajusta o bias um pouco a mais
    if alguma['peso']<bias:bias-=bias*0.01 #ajusta o bias um pouco a menos

    print(f"biasfinal = {bias:.6f}")

print(f"\nO valor que diferencia as laranjas: {bias:.6f}\n\nCom uma margem de erro calibrada esse valor pode ser utilizado para classificar a fruta.")
