export interface IContact {
    id: string;
    name: string;
    phone: string;
    completed: boolean;
  }

export type HandlerProps = Omit<IContact, 'id | completed'>;

