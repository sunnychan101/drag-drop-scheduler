const jsonData = [
  {
    CaseName: "CW1",
    CaseNumber: "SCC-01-002",
    ServiceOrderNumber: "SO001-2022",
    AssignedTo: "",
    ServiceItems: [
      
    ],
  },
  {
    CaseName: "CW2",
    CaseNumber: "SCC-02-002",
    ServiceOrderNumber: "SO002-2022",
    AssignedTo: "",
    ServiceItems: [
      {
        TimeFrom: "08:00",
        TimeTo: "09:00",
        ServiceType: "Off",
        isLeave: true,
      },
      {
        TimeFrom: "11:00",
        TimeTo: "12:00",
        ServiceType: "加納特, HC45,PD30,PC30, 收費服務",
        isLeave: false,
      },
      {
        TimeFrom: "12:00",
        TimeTo: "13:00",
        ServiceType: "Lunch",
        isLeave: true,
      },
      {
        TimeFrom: "14:00",
        TimeTo: "15:45",
        ServiceType: "陳享樂, EX30,HC45,PD30 收費服務",
        isLeave: false,
      },
      {
        TimeFrom: "18:00",
        TimeTo: "21:00",
        ServiceType: "Off",
        isLeave: true,
      }
    ],
  }
];

const gridData = [
  {
    CaseName: "",
    CaseNumber: "服務線二  秦石，新翠",
    ServiceOrderNumber: "SO004-2022",
    AssignedTo: "",
    ServiceItems: [
      {
        TimeFrom: "09:00",
        TimeTo: "10:45",
        ServiceType: "魚民樂, HC45,PD30,PC30, 收費服務",
        isLeave: false
      },
      {
        TimeFrom: "12:30",
        TimeTo: "14:15",
        ServiceType: "陳快活, HC45,PD30,PC30, 收費服務",
        isLeave: false
      }
    ],
  },
  {
    CaseName: "",
    CaseNumber: "服務線三  石門",
    ServiceOrderNumber: "SO005-2022",
    AssignedTo: "",
    ServiceItems: [
      {
        TimeFrom: "11:00",
        TimeTo: "12:00",
        ServiceType: "陳大文(秦石), EX60, 收費服務",
        isLeave: false
      },
      {
        TimeFrom: "16:00",
        TimeTo: "17:45",
        ServiceType: "陳彼得, HC45,PD30,PC30, 收費服務",
        isLeave: false
      }
    ],
  },
];

const myData = [];
const myResourceData = [];

for (var m = 0; m < jsonData.length; m++) {
  var caseName = jsonData[m].CaseName;
  var caseNo = jsonData[m].CaseNumber;
  var serviceOrderNumber = jsonData[m].ServiceOrderNumber;
  myResourceData.push({
    id: m,
    text: caseName,
    ppl: caseName,
    value: caseName,
    removable: false,
  });
  for (var i = 0; i < jsonData[m].ServiceItems.length; i++) {
    myData.push({
      start: jsonData[m].ServiceItems[i].TimeFrom,
      end: jsonData[m].ServiceItems[i].TimeTo,
      title: jsonData[m].ServiceItems[i].ServiceType,
      caseId: caseName,
      pplId: m,
      isLeave: jsonData[m].ServiceItems[i].isLeave,
      //
      caseNo: caseNo,
      serviceOrderNumber: serviceOrderNumber,
    });
  }
}

export const customData = myData;
export const customResourceData = myResourceData;
export const customGridData = gridData;
