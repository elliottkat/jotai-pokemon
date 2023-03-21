export interface Pokemon {
    id: number;
    name: { english: string; japanese?: string | undefined; chinese?: string | undefined; french?: string | undefined };
    type: string[];
    base?: any | undefined;
}
