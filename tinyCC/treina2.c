#include<stdio.h> //FILE
#include<stdlib.h> //rand
#include<time.h>

typedef struct{
	double inputs[8]; //8 características da fruta
	double target; //espécie
} fruta;

int main(){
	fruta dataset[60];
	srand(time(0));

	//carregamento dos valores
	FILE *fp=fopen("entradas2.txt","r");
	for(int x=0;x<60;x++){
		double in[8];
		char especie;
		fscanf(fp,"%lf %lf %lf %lf %lf %lf %lf %lf %c\n", &in[0],&in[1],&in[2],&in[3],&in[4],&in[5],&in[6],&in[7],&especie);
		for(int i=0;i<8;i++)dataset[x].inputs[i]=in[i];
		dataset[x].target=(especie=='l')?1.0:0.0;
	}
	fclose(fp);

	//inicializa estruturas de dados
	double weights[8];
	for(int i=0;i<8;i++)weights[i]=(double)rand()/(double)RAND_MAX;
	double bias=0.0;

	for(int x=0;x<200000;x++){ //ajusta os bias centenas de vezes
		int erros=0;

		for(int i=0;i<100;i++){ //cada geracao tem 100 individuos
			int alguma=rand()%60; //escolhe uma fruta qualquer

			double somatorio=bias;
			for(int h=0;h<8;h++)somatorio+=weights[h]*dataset[alguma].inputs[h];

			double degrau=somatorio>=0.0?1.0:0.0;
			degrau=dataset[alguma].target-degrau;

			if(degrau!=0.0){
				erros++;
				for(int h=0;h<8;h++)weights[h]+=0.000002*degrau*dataset[alguma].inputs[h]; //ajusta os weights para mais ou para menos de acordo com target-degrau
				bias+=0.000002*degrau;
			}
		}

		printf("%6d biasfinal = %.6lf\n", 200000-x, bias);

		if(x%10000==0&&erros==0)break; //o bias foi encontrado
	}

	//Salva os pesos e bias
	fp=fopen("bias1.txt","w");
	for(int i=0;i<8;i++)fprintf(fp,"%lf\n",weights[i]);
	fprintf(fp,"%lf\n",bias);
	fclose(fp);

	printf("\nTreinamento finalizado. Pesos salvos em 'bias1.txt'\n");
	return 0;
}
