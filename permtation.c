#include <stdio.h>

void permute(int permutation[], int start, int end, int n);
void print(int number, int permutation[], int n);
void swap(int *n1, int *n2);

int main(){
    int permutation[] = {0,1,2, 3};
    int n = sizeof(permutation)/sizeof(permutation[0]);
    permute(permutation, 0, 2, n);
    return 0;
}

void permute(int permutation[], int start, int end, int n){
    if(start == end){
    //     for (int i = 0; i < 3; i++)
    // {
    //     printf("%d, ", permutation[i]);
    // }
    // printf("\n");
        // print(1, permutation);
    }
    else{

    for (int i = start; i <= end; i++)
    {
        swap(&permutation[start], &permutation[i]);
        print(1, permutation, n);

        permute(permutation, start+1, end, n);

        swap(&permutation[start], &permutation[i]);
        print(2, permutation, n);
        


    }
    
    }
}


void print(int number, int permutation[], int n){
    if(number == 1) printf("First Swap: ");
    else printf("Backtrack Swap: ");
    for (int i = 0; i < n; i++)
    {
        printf("%d, ", permutation[i]);
    }
    printf("\n");
    
}


void swap(int *n1, int *n2){
    int temp = *n1;
    *n1 = *n2;
    *n2 = temp;
}