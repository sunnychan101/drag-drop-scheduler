const jsonData = [
  {
    CaseName: "Sunny Chan",
    CaseNumber: "SCC-01-002",
    ServiceOrderNumber: "SO001-2022",
    AssignedTo: "",
    ServiceItems: [
      {
        TimeFrom: "9:00",
        TimeTo: "10:30",
        ServiceType: "Personal Care",
      },
      {
        TimeFrom: "14:00",
        TimeTo: "15:00",
        ServiceType: "Shopping",
      },
      {
        TimeFrom: "15:30",
        TimeTo: "16:15",
        ServiceType: "Meal Delivery",
      },
    ],
  },
  {
    CaseName: "Kelvin Leung",
    CaseNumber: "SCC-02-002",
    ServiceOrderNumber: "SO002-2022",
    AssignedTo: "",
    ServiceItems: [
      {
        TimeFrom: "09:00",
        TimeTo: "10:15",
        ServiceType: "Personal Care",
      },
      {
        TimeFrom: "12:00",
        TimeTo: "15:30",
        ServiceType: "Shopping",
      },
      {
        TimeFrom: "16:00",
        TimeTo: "17:15",
        ServiceType: "Meal Delivery",
      },
    ],
  },
  {
    CaseName: "Gordon Lau",
    CaseNumber: "SCC-02-003",
    ServiceOrderNumber: "SO003-2022",
    AssignedTo: "",
    ServiceItems: [
      {
        TimeFrom: "9:15",
        TimeTo: "11:30",
        ServiceType: "Personal Care",
      },
      {
        TimeFrom: "12:00",
        TimeTo: "16:30",
        ServiceType: "Shopping",
      },
      {
        TimeFrom: "17:00",
        TimeTo: "18:15",
        ServiceType: "Meal Delivery",
      },
    ],
  },
];

const gridData = [
  {
    CaseName: "",
    CaseNumber: "SCC-02-004",
    ServiceOrderNumber: "SO004-2022",
    AssignedTo: "",
    ServiceItems: [
      {
        TimeFrom: "10:15",
        TimeTo: "12:30",
        ServiceType: "Personal CareNew",
      },
      {
        TimeFrom: "13:00",
        TimeTo: "17:30",
        ServiceType: "ShoppingNew",
      },
    ],
  },
  {
    CaseName: "",
    CaseNumber: "SCC-02-005",
    ServiceOrderNumber: "SO005-2022",
    AssignedTo: "",
    ServiceItems: [
      {
        TimeFrom: "11:15",
        TimeTo: "13:30",
        ServiceType: "Personal CareNew",
      },
      {
        TimeFrom: "17:00",
        TimeTo: "18:30",
        ServiceType: "ShoppingNew",
      },
    ],
  },
];

const myData = [];
const myResourceData = [];

for (const mycase of jsonData) {
  var caseName = mycase.CaseName;
  var ServiceOrderNumber = mycase.ServiceOrderNumber;
  myResourceData.push({
    text: caseName,
    ppl: caseName,
    value: caseName + ServiceOrderNumber,
  });
  for (const serviceItem of mycase.ServiceItems) {
    myData.push({
      start: serviceItem.TimeFrom,
      end: serviceItem.TimeTo,
      title: serviceItem.ServiceType,
      caseId: caseName + ServiceOrderNumber,
    });
  }
}

export const customData = myData;
export const customResourceData = myResourceData;
export const customGridData = gridData;
