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

export const samplesMock = {
  samples: [
    {
      id: "6a88a51d-88cf-4a63-ab59-b4da32d6c777",
      code: "AX45",
      project: "Nitro",
      createdAtUtc: "2025-10-07T20:22:34.8386110Z",
      comment: "First sample!",
    },
    {
      id: "4222c66d-f2f0-478a-8a2e-61a421af2777",
      code: "AX44",
      project: "Nitro",
      createdAtUtc: "2025-10-07T20:22:34.82576777",
      comment: "First sample!",
    },
    {
      id: "b21560c4-7760-4207-a389-d19206412777",
      code: "AX43",
      project: "Nitro",
      createdAtUtc: "2025-10-07T20:22:34.81394777",
      comment: "First sample!",
    },
    {
      id: "5825f3f3-73f2-486c-a3bf-706a9297a777",
      code: "AX42",
      project: "Nitro",
      createdAtUtc: "2025-10-07T20:22:34.8002620Z",
      comment: "First sample!",
    },
    {
      id: "5dbce5fa-1fc5-44dd-be66-92cade332777",
      code: "AX41",
      project: "Nitro",
      createdAtUtc: "2025-10-07T20:22:34.7826600Z",
      comment: "First sample!",
    },
    {
      id: "e3dbc0e6-1e48-4425-8d7a-dce56b951777",
      code: "AX40",
      project: "Nitro",
      createdAtUtc: "2025-10-07T20:22:34.7660710Z",
      comment: "First sample!",
    },
    {
      id: "d4ce7736-d597-45c7-8e11-6a431e9fe777",
      code: "AX39",
      project: "Nitro",
      createdAtUtc: "2025-10-07T20:22:34.7412850Z",
      comment: "First sample!",
    },
    {
      id: "3842d12c-3556-4903-8461-0a6d13223777",
      code: "AX38",
      project: "Nitro",
      createdAtUtc: "2025-10-07T20:22:34.7216540Z",
      comment: "First sample!",
    },
    {
      id: "3dc4113e-90c8-4b65-8b4a-bf5280be3777",
      code: "AX37",
      project: "Nitro",
      createdAtUtc: "2025-10-07T20:22:34.6994550Z",
      comment: "First sample!",
    },
    {
      id: "35f75b43-7ad8-4bca-b8f7-c8763a7e6777",
      code: "AX36",
      project: "Nitro",
      createdAtUtc: "2025-10-07T20:22:34.6635000Z",
      comment: "First sample!",
    },
    {
      id: "c113a2a5-294b-4a81-a757-3586f655f777",
      code: "AX35",
      project: "Nitro",
      createdAtUtc: "2025-10-07T20:22:34.6386130Z",
      comment: "First sample!",
    },
    {
      id: "c4160064-d7a6-4f5b-aa5d-2607e24d3777",
      code: "AX34",
      project: "Nitro",
      createdAtUtc: "2025-10-07T20:22:34.6030140Z",
      comment: "First sample!",
    },
  ],
};

export const sampleMock = {
  samples: [
    {
      id: "6a88a51d-88cf-4a63-ab59-b4da32d6c777",
      code: "AX46",
      project: "Nitro",
      createdAtUtc: "2025-10-07T20:22:34.8386110Z",
      comment: "First sample!",
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

export const recentSamplesMock = {
  recentSamples: [
    {
      id: "edd5c7be-70db-4efe-a789-2750d9d27a5b",
      code: "AX45",
      project: "Nitro",
      createdAtUtc: "2025-05-16T10:04:00.0687470Z",
      comment: "First sample!",
    },
    {
      id: "e774a026-18e9-4f38-9e41-8f524a5bf43b",
      code: "AX44",
      project: "Nitro",
      createdAtUtc: "2025-05-16T10:04:00.0562750Z",
      comment: "Second sample!",
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
    {
      $type: "decimal",
      step: 0.1,
      defaultValue: 1.5,
      unit: "h",
      id: "b334a12b-4e8a-44ef-aa6a-3b83d89e407e",
      name: "Time",
      order: 1,
      parentId: null,
    },
    {
      $type: "text",
      allowedValues: [
        "spin-coating",
        "nucleation",
        "dip-coating",
        "without nucleation",
      ],
      defaultValue: "spin-coating",
      id: "6e63f85e-0777-497b-94ad-3c98680bf57f",
      name: "Nucleation Method",
      order: 3,
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
