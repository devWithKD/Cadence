export const cards = [
  {
    id: "task-123",
    parent: "uuid-1",
    title: "Write a report on quarterly sales",
    hasDue: true,
    dueDate: new Date("2024-04-10"),
    description: "Analyze sales data and create a comprehensive report highlighting trends and insights.",
    hasCheckList: true,
    checkList: [
      {
        id: "milestone-1",
        title: "Gather sales data",
        status: false,
        description: "",
      },
      {
        id: "milestone-2",
        title: "Analyze data and create charts",
        status: false,
        description: "",
      },
      {
        id: "milestone-3",
        title: "Write report and format",
        status: false,
        description: "",
      },
    ],
  },
  {
    id: "task-456",
    parent: "uuid-1",
    title: "Review marketing campaign performance",
    hasDue: true,
    dueDate: new Date("2024-04-03"),
    description: "Analyze key metrics and identify areas for improvement.",
    hasCheckList: true,
    checkList: [
      {
        id: "milestone-4",
        title: "Collect campaign data",
        status: false,
        description: "",
      },
      {
        id: "milestone-5",
        title: "Evaluate click-through rate and conversions",
        status: false,
        description: "",
      },
      {
        id: "milestone-6",
        title: "Develop recommendations for optimization",
        status: false,
        description: "",
      },
    ],
  },
  {
    id: "task-789",
    parent: "uuid-1",
    title: "Plan next quarter's social media strategy",
    hasDue: false, // No due date for this ongoing task
    dueDate: null,
    description: "Develop content calendar and define target audience.",
    hasCheckList: true,
    checkList: [
      {
        id: "milestone-7",
        title: "Identify target audience demographics",
        status: false,
        description: "",
      },
      {
        id: "milestone-8",
        title: "Research trending topics and content formats",
        status: false,
        description: "",
      },
      {
        id: "milestone-9",
        title: "Create social media content calendar",
        status: false,
        description: "",
      },
    ],
  },
  {
    id: "task-010",
    parent: "uuid-1",
    title: "Follow up on outstanding client queries",
    hasDue: true,
    dueDate: new Date("2024-04-01"),
    description: "Respond to emails and phone calls from clients.",
    hasCheckList: false, // No checklist for this simple task
    checkList: null,
  },
  {
    id: "task-XYZ",
    parent: "uuid-1",
    title: "Onboard new team member",
    hasDue: true,
    dueDate: new Date("2024-04-08"),
    description: "Provide necessary resources and training for successful integration.",
    hasCheckList: true,
    checkList: [
      {
        id: "milestone-10",
        title: "Prepare welcome kit and onboarding materials",
        status: false,
        description: "",
      },
      {
        id: "milestone-11",
        title: "Schedule introductory meetings with team members",
        status: false,
        description: "",
      },
      {
        id: "milestone-12",
        title: "Grant access to tools and systems",
        status: false,
        description: "",
      },
    ],
  },
];
