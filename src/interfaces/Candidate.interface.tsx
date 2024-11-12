// TODO: Create an interface for the Candidate objects returned by the API
interface Candidate {
    id: number;
    avatar_url: string;
    html_url: string;
    [key: string]: any;
    name: string;
    location: string;
    company: string;
    bio: string;
}
