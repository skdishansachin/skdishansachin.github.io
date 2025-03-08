import { format } from "date-fns";

export function limit(text: string, limit = 80): string {
    if (text.length <= limit) {
        return text;
    }
    return text.slice(0, limit) + '...';
}

export function date(date: string): string {
    return format(new Date(date), 'd MMMM yyyy')
}
