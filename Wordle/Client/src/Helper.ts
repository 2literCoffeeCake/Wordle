export class Helper {

    public static isEmpty(value: any) {
        return value == null || value == undefined;
    } 

    public static toggleStyle(style: "dark" | "light") {
        if (style === "dark") {
            document.body.classList.remove("light");
        } else {
            document.body.classList.remove("dark");
        }
        document.body.classList.add(style);
    }

    public static readFromClientStorage<T>(key: string, fallback: T = null) {
        let result = localStorage.getItem(`wordle__${key}`) as any;
        if (Helper.isEmpty(result)) {
            result = fallback;
        }
        return result as T;
    }

    public static saveToClientStorage(key: string, object: any) {
        localStorage.setItem(`wordle__${key}`, object);
    }
}