export type TimetableData = {
    [day: string]: {
      name: string;
      subject: string;
      time: string;
    }[];
};