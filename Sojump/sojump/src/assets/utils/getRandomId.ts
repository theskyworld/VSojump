export default function getRandomId(len: number) : string{
    return Math.random().toString(36).substr(2, len);
}