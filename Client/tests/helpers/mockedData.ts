export const projectsMock = {
  projects: [
    {
      id: "e2ec5e7b-09f3-4393-b4ed-2b9331859777",
      name: "Upturn",
      isActive: true,
    },
  ],
};

export const projectDetailsMock = {
  id: "e2ec5e7b-09f3-4393-b4ed-2b9331859777",
  name: "Upturn",
  isActive: true,
  samplesIds: [
    "6a88a51d-88cf-4a63-ab59-b4da32d6cf21",
    "4222c66d-f2f0-478a-8a2e-61a421af242b",
  ],
};

export const processesMock = {
  processes: [
    {
      id: "c382820c-accf-4bae-8b76-04207ebc3777",
      code: {
        prefix: "ZX",
        sequentialNumber: 2,
      },
      projects: ["Nobelium"],
      createdAtUtc: "2025-12-03T08:31:00.3092960Z",
      comment: "",
    },
    {
      id: "6552bcb6-91c7-4f49-8b9f-818479c48777",
      code: {
        prefix: "CX",
        sequentialNumber: 5,
      },
      projects: ["Nitro"],
      createdAtUtc: "2025-12-03T08:29:20.0512670Z",
      comment: "",
    },
    {
      id: "ec7a210b-077c-4725-8242-1c6f056d8777",
      code: {
        prefix: "CX",
        sequentialNumber: 4,
      },
      projects: ["Nobelium"],
      createdAtUtc: "2025-12-03T08:29:07.6017050Z",
      comment: "",
    },
    {
      id: "849d1dcd-6780-4198-8aa2-5a341e4e0777",
      code: {
        prefix: "CX",
        sequentialNumber: 3,
      },
      projects: ["Nitro"],
      createdAtUtc: "2025-12-02T09:11:18.6964730Z",
      comment: "TEST",
    },
    {
      id: "450af56c-4b8d-4dce-a58c-43c32b5d2777",
      code: {
        prefix: "ZX",
        sequentialNumber: 1,
      },
      projects: ["Nitro"],
      createdAtUtc: "2025-11-28T21:23:33.5691770Z",
      comment: "TEST",
    },
    {
      id: "49e1dc00-ecd3-465c-a817-d65ff3d62777",
      code: {
        prefix: "CX",
        sequentialNumber: 2,
      },
      projects: ["Nobelium"],
      createdAtUtc: "2025-11-28T21:18:23.0884950Z",
      comment: "",
    },
    {
      id: "6eb9f14c-64b6-4025-baea-70369e793777",
      code: {
        prefix: "BX",
        sequentialNumber: 9,
      },
      projects: ["Upturn"],
      createdAtUtc: "2025-11-28T21:17:51.8386630Z",
      comment: "test",
    },
    {
      id: "09dca856-f2ba-419b-8f8f-f995251df777",
      code: {
        prefix: "BX",
        sequentialNumber: 8,
      },
      projects: ["Nobelium"],
      createdAtUtc: "2025-11-28T21:12:35.7787600Z",
      comment: "",
    },
    {
      id: "557b6f33-f767-4969-989d-260ef7db6777",
      code: {
        prefix: "BX",
        sequentialNumber: 7,
      },
      projects: ["Nitro", "Upturn", "Nobelium"],
      createdAtUtc: "2025-11-28T20:52:46.8620480Z",
      comment: "Process 45",
    },
    {
      id: "b315d3ec-bd53-4d6b-8fe2-6768f839a777",
      code: {
        prefix: "CX",
        sequentialNumber: 1,
      },
      projects: ["Nitro", "Upturn", "Nobelium"],
      createdAtUtc: "2025-11-28T20:52:46.8203000Z",
      comment: "Process 14",
    },
  ],
};

export const processMock = {
  processes: [
    {
      id: "b315d3ec-bd53-4d6b-8fe2-6768f839a777",
      code: {
        prefix: "CX",
        sequentialNumber: 1,
      },
      projects: ["Nitro", "Upturn", "Nobelium"],
      createdAtUtc: "2025-11-28T20:52:46.8203000Z",
      comment: "Process 14",
    },
  ],
};

export const sampleDetailsMock = {
  id: "6a88a51d-88cf-4a63-ab59-b4da32d6c777",
  code: "AX45",
  recipe: null,
  createdAtUtc: "2025-10-07T20:22:34.8386110Z",
  comment: "First sample!",
  projectId: "e2ec5e7b-09f3-4393-b4ed-2b9331859777",
  steps: [
    {
      id: "e3e33829-2a45-4c08-874a-c8264877893a",
      parameters: [
        {
          $type: "integer",
          value: 300,
          unit: "sccm",
          id: "7447c05a-20e3-4765-b9e9-26d539bde7f0",
          name: "HÔéé",
        },
        {
          $type: "integer",
          value: 2000,
          unit: "ppm",
          id: "2dfd70fe-2dcc-418f-bda2-48decd782c7f",
          name: "B/C",
        },
        {
          $type: "decimal",
          value: 2.3,
          unit: "h",
          id: "b334a12b-4e8a-44ef-aa6a-3b83d89e407e",
          name: "Time",
        },
        {
          $type: "integer",
          value: 20,
          unit: "Torr",
          id: "c452eb60-0325-4cad-91b3-08a7bfd08627",
          name: "Pressure",
        },
        {
          $type: "text",
          value: "spin-coating",
          allowedValues: [
            "spin-coating",
            "nucleation",
            "dip-coating",
            "without nucleation",
          ],
          id: "6e63f85e-0777-497b-94ad-3c98680bf57f",
          name: "Nucleation Method",
        },
        {
          $type: "integer",
          value: 240,
          unit: "sccm",
          id: "133baa9e-5615-4d2b-a58c-eeb0242ab309",
          name: "BÔééHÔéć",
        },
        {
          $type: "text",
          value: "silicon",
          allowedValues: ["silicon", "silicon dioxide", "glass", "tantalum"],
          id: "f185433d-8644-4118-82a8-a8f3c79f35dd",
          name: "Substrate",
        },
        {
          $type: "integer",
          value: 1300,
          unit: "W",
          id: "98cc204a-051a-4a0c-8059-2cc3344f094e",
          name: "Pmw",
        },
        {
          $type: "decimal",
          value: 0,
          unit: "h",
          id: "4ed88add-6c06-462a-82ae-da5f09ab3507",
          name: "Buffer",
        },
        {
          $type: "integer",
          value: 100,
          unit: "sccm",
          id: "c88be10d-d98f-4569-bf26-83dca7efbe39",
          name: "CHÔéä",
        },
        {
          $type: "text",
          value: "none",
          allowedValues: ["none", "nitrogen", "oxygen"],
          id: "f0c81337-8628-4b34-8e3e-d7552f372348",
          name: "Additional gases",
        },
        {
          $type: "integer",
          value: 800,
          unit: "CÔü░",
          id: "60de6367-5025-423d-8edd-bac518f0b98a",
          name: "Temperature",
        },
      ],
      comment: "First step!",
    },
  ],
  tags: [
    {
      id: "8063c156-d487-4227-bbfd-ed3f7afd51a6",
      name: "popular-sample",
    },
    {
      id: "d81a415b-dd62-4913-a865-f101bd352ceb",
      name: "high-pressure",
    },
  ],
};

export const tagsMock = {
  tags: [
    {
      id: "8063c156-d487-4227-bbfd-ed3f7afd5777",
      name: "popular-sample",
    },
    {
      id: "b9e8adad-0dc7-4984-8598-eef1e32da777",
      name: "new-sample",
    },
    {
      id: "834da7b5-8641-4e59-85af-cb8f6bb97777",
      name: "methane-rich",
    },
  ],
};

export const tagMock = {
  tags: [
    {
      id: "8063c156-d487-4227-bbfd-ed3f7afd5777",
      name: "popular-sample",
    },
  ],
};

export const tagDetailsMock = {
  id: "8063c156-d487-4227-bbfd-ed3f7afd5777",
  name: "popular-sample",
  isActive: true,
};

export const recentProcessesMock = {
  recentSamples: [
    {
      id: "c382820c-accf-4bae-8b76-04207ebc3777",
      code: {
        prefix: "ZX",
        sequentialNumber: 2,
      },
      projects: ["Nobelium"],
      createdAtUtc: "2025-12-03T08:31:00.3092960Z",
      comment: "",
    },
    {
      id: "6552bcb6-91c7-4f49-8b9f-818479c48777",
      code: {
        prefix: "CX",
        sequentialNumber: 5,
      },
      projects: ["Nitro"],
      createdAtUtc: "2025-12-03T08:29:20.0512670Z",
      comment: "",
    },
    {
      id: "ec7a210b-077c-4725-8242-1c6f056d8777",
      code: {
        prefix: "CX",
        sequentialNumber: 4,
      },
      projects: ["Nobelium"],
      createdAtUtc: "2025-12-03T08:29:07.6017050Z",
      comment: "",
    },
  ],
};

export const parametersMock = {
  parameters: [
    {
      $type: "integer",
      step: 1,
      defaultValue: 0,
      unit: "Torr",
      id: "c452eb60-0325-4cad-91b3-08a7bfd08777",
      name: "Pressure",
      order: 0,
      parentId: null,
    },
  ],
};

export const parameterMock = {
  parameters: [
    {
      $type: "integer",
      step: 1,
      defaultValue: 0,
      unit: "Torr",
      id: "c452eb60-0325-4cad-91b3-08a7bfd08777",
      name: "Pressure",
      order: 0,
      parentId: null,
    },
  ],
};

export const parameterDetailsMock = {
  step: 1,
  defaultValue: 0,
  unit: "Torr",
  id: {
    value: "c452eb60-0325-4cad-91b3-08a7bfd08777",
  },
  name: {
    value: "Pressure",
  },
  order: 0,
  isActive: true,
  parent: null,
};

export const recipesMock = {
  recipes: [
    {
      id: "7476949a-1698-48a7-bae3-ba1c4375d777",
      name: "recipe",
    },
  ],
};

export const recipesAmountMock = 1;

export const recipeDetailsMock = {
  id: "7476949a-1698-48a7-bae3-ba1c4375d777",
  name: "recipe",
  steps: [
    {
      id: "feef47f4-a138-4295-88fe-43ec2c84a679",
      parameters: [
        {
          $type: "integer",
          value: 2137,
          unit: "CÔü░",
          id: "60de6367-5025-423d-8edd-bac518f0b98a",
          name: "Temperature",
        },
        {
          $type: "decimal",
          value: 60,
          unit: "h",
          id: "31508de7-28a4-4254-95e0-848e1e9b94dc",
          name: "Time",
        },
      ],
      comment: "First step",
    },
    {
      id: "61ec685d-963a-4d81-9213-cb1b45cdea09",
      parameters: [
        {
          $type: "integer",
          value: 1333,
          unit: "Torr",
          id: "c452eb60-0325-4cad-91b3-08a7bfd08627",
          name: "Pressure",
        },
      ],
      comment: "Second step",
    },
  ],
};

export const usersMock = {
  users: [
    {
      id: "a83100f0-7a50-413e-8fb0-9d2c882cf777",
      email: "admin@test.com",
      role: "Administrator",
    },
    {
      id: "b83100f0-7a50-413e-8fb0-9d2c882cf888",
      email: "moderator@test.com",
      role: "Moderator",
    },
    {
      id: "c83100f0-7a50-413e-8fb0-9d2c882cf999",
      email: "guest@test.com",
      role: "Guest",
    },
  ],
};

export const userMock = {
  users: [
    {
      id: "b83100f0-7a50-413e-8fb0-9d2c882cf888",
      email: "moderator@test.com",
      role: "Moderator",
    },
  ],
};

export const userDetilsMock = {
  id: "b83100f0-7a50-413e-8fb0-9d2c882cf888",
  email: "moderator@test.com",
  role: "Moderator",
};
