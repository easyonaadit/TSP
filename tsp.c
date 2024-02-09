#include <stdio.h>
#include <stdlib.h>
#include <math.h>
#include <limits.h>

#define MAX_CITIES 10
#define INFINITYx INT_MAX

typedef struct {
    int x;
    int y;
} Point;

int factorial(int n) {
    if (n <= 1) return 1;
    return n * factorial(n - 1);
}

void swap(int* a, int* b) {
    int temp = *a;
    *a = *b;
    *b = temp;
}

void permute(int cities[], int start, int end, int* permutations, int* count) {
    if (start == end) {
        for (int i = 0; i <= end; ++i) {
            permutations[(*count)++] = cities[i];
        }
    } else {
        for (int i = start; i <= end; ++i) {
            swap(&cities[start], &cities[i]);
            permute(cities, start + 1, end, permutations, count);
            swap(&cities[start], &cities[i]); // backtrack
        }
    }
}

double calculateDistance(Point city1, Point city2) {
    return sqrt(pow(city1.x - city2.x, 2) + pow(city1.y - city2.y, 2));
}

double calculateTotalDistance(int permutation[], Point cities[], int numCities) {
    double totalDistance = 0;
    for (int i = 1; i < numCities; ++i) {
        totalDistance += calculateDistance(cities[permutation[i - 1]], cities[permutation[i]]);
    }
    totalDistance += calculateDistance(cities[permutation[numCities - 1]], cities[permutation[0]]);
    return totalDistance;
}

void bruteForceTSP(Point cities[], int numCities) {
    int cityIndices[MAX_CITIES];
    int *permutations = (int *)malloc(MAX_CITIES * factorial(MAX_CITIES) * sizeof(int));
    int count = 0;

    for (int i = 0; i < numCities; ++i) {
        cityIndices[i] = i;
    }

    permute(cityIndices, 0, numCities - 1, permutations, &count);

    double minDistance = INFINITYx;
    int optimalTour[MAX_CITIES];

    for (int i = 0; i < factorial(numCities); ++i) {
        double totalDistance = calculateTotalDistance(&permutations[i * numCities], cities, numCities);
        if (totalDistance < minDistance) {
            minDistance = totalDistance;
            for (int j = 0; j < numCities; ++j) {
                optimalTour[j] = permutations[i * numCities + j];
            }
        }
    }

    printf("Optimal Tour: ");
    for (int i = 0; i < numCities; ++i) {
        printf("%d ", optimalTour[i]);
    }
    printf("\n");
    printf("Minimum Distance: %f\n", minDistance);

    free(permutations);
}

int main() {
    Point cities[] = {{0, 10}, {1, 42}, {32, 4}, {39, 1}, {50, 7}, {3,5}, {100, 64}, {3, 6}};
    int numCities = sizeof(cities) / sizeof(cities[0]);

    bruteForceTSP(cities, numCities);

    return 0;
}
