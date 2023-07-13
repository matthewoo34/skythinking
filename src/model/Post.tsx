export class Post {
    userId: number;
    id: number;
    title: string;
    body: string;

    constructor(c?: { [key: string]: any }) {
        c = c || {};
        this.userId = c.userId || null;
        this.id = c.id || null;
        this.title = c.title || '';
        this.body = c.body || '';
    }
}
