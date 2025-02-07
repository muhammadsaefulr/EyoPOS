export interface Member {
    id: string
    name: string
    email: string
    role: "ADMIN" | "MEMBER" | "GUEST"
  }
  
  export const initialMembers: Member[] = [
    { id: "1", name: "John Doe", email: "john@example.com", role: "ADMIN" },
    { id: "2", name: "Jane Smith", email: "jane@example.com", role: "MEMBER" },
    { id: "3", name: "Bob Johnson", email: "bob@example.com", role: "GUEST" },
  ]
  
  