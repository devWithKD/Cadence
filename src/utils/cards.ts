export const cards = [
  {
    uid: "task-123",
    parent: "uuid-1",
    title: "Write a report on quarterly sales",
    hasStart: false,
    hasDue: true,
    dueDate: new Date("2024-04-10"),
    description: "Analyze sales data and create a comprehensive report highlighting trends and insights.",
    hasCheckList: true,
    checkList: [
      {
        uid: "milestone-1",
        title: "Gather sales data",
        status: false,
      },
      {
        uid: "milestone-2",
        title: "Analyze data and create charts",
        status: false,
      },
      {
        uid: "milestone-3",
        title: "Write report and format",
        status: false,
      },
    ],
    boardID: "",
    owner: "",
  },
  {
    uid: "task-456",
    parent: "uuid-1",
    title: "Review marketing campaign performance",
    hasStart: false,
    hasDue: true,
    dueDate: new Date("2024-04-03"),
    description: "Analyze key metrics and identify areas for improvement.Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris vel massa a ligula tempor viverra non quis felis. Mauris faucibus vel lacus tincidunt dictum. Etiam vitae nunc eleifend, imperdiet dui quis, sollicitudin nisi. Mauris tempor rutrum magna sed condimentum. Nam consequat malesuada risus, sit amet pretium purus aliquam quis. Aliquam.",
    hasCheckList: true,
    checkList: [
      {
        uid: "milestone-4",
        title: "Collect campaign data",
        status: false,
      },
      {
        uid: "milestone-5",
        title: "Evaluate click-through rate and conversions",
        status: false,
      },
      {
        uid: "milestone-6",
        title: "Develop recommendations for optimization",
        status: false,
      },
    ],
    boardID: "",
    owner: "",
  },
  {
    uid: "task-789",
    parent: "uuid-1",
    title: "Plan next quarter's social media strategy",
    hasStart: false,
    hasDue: false, // No due date for this ongoing task
    dueDate: null,
    description: "Develop content calendar and define target audience.",
    hasCheckList: true,
    checkList: [
      {
        uid: "milestone-7",
        title: "Identify target audience demographics",
        status: false,
      },
      {
        uid: "milestone-8",
        title: "Research trending topics and content formats",
        status: false,
      },
      {
        uid: "milestone-9",
        title: "Create social media content calendar",
        status: false,
      },
    ],
    boardID: "",
    owner: "",
  },
  {
    uid: "task-010",
    parent: "uuid-1",
    title: "Follow up on outstanding client queries",
    hasStart: false,
    hasDue: true,
    dueDate: new Date("2024-04-01"),
    description: "Respond to emails and phone calls from clients.",
    hasCheckList: false, // No checklist for this simple task
    boardID: "",
    owner: "",
    checkList: null,
  },
  {
    uid: "task-XYZ",
    parent: "uuid-1",
    title: "Onboard new team member",
    hasStart: false,
    hasDue: true,
    dueDate: new Date("2024-04-08"),
    description: "Provide necessary resources and training for successful integration.",
    hasCheckList: true,
    checkList: [
      {
        uid: "milestone-10",
        title: "Prepare welcome kit and onboarding materials",
        status: false,
      },
      {
        uid: "milestone-11",
        title: "Schedule introductory meetings with team members",
        status: false,
      },
      {
        uid: "milestone-12",
        title: "Grant access to tools and systems",
        status: false,
      },
    ],
    boardID: "",
    owner: "",
  },
];

