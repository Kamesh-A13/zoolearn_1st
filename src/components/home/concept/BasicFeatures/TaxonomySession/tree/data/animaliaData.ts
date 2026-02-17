export type AnimaliaNode = {
  id: string;
  label: string;
  children?: AnimaliaNode[];
};

export const animaliaTree: AnimaliaNode = {
  id: "animalia",
  label: "Animalia (K)",
  children: [
    {
      id: "parazoa",
      label: "Parazoa (SK)",
      children: [
        {
          id: "porifera",
          label: "Porifera (P)",
        },
      ],
    },
    {
      id: "eumetazoa",
      label: "Eumetazoa (SK)",
      children: [
        {
          id: "radial",
          label: "Radial",
          children: [
            {
              id: "coelenterata",
              label: "Coelenterata (P)",
            },
            {
              id: "ctenophora",
              label: "Ctenophora (P)",
            },
          ],
        },
        {
          id: "bilateral",
          label: "Bilateral",
          children: [
            {
              id: "acoelomates",
              label: "Acoelomates",
              children: [
                {
                  id: "platyhelminthes",
                  label: "Platyhelminthes (P)",
                },
              ],
            },
            {
              id: "pseudocoelomates",
              label: "Pseudocoelomates",
              children: [
                {
                  id: "aschelminthes",
                  label: "Aschelminthes (P)",
                },
              ],
            },
            {
              id: "coelomates",
              label: "Coelomates",
              children: [
                {
                  id: "annelida",
                  label: "Annelida (P)",
                },
                {
                  id: "arthropoda",
                  label: "Arthropoda (P)",
                },
                {
                  id: "mollusca",
                  label: "Mollusca (P)",
                },
                {
                  id: "echinodermata",
                  label: "Echinodermata (P)",
                },
                {
                  id: "hemichordata",
                  label: "Hemichordata (P)",
                },
                {
                  id: "chordata",
                  label: "Chordata (P)",
                },
              ],
            },
          ],
        },
      ],
    },
  ],
};
