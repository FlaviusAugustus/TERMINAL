export type TagCreateRequest = {
    name: string;
}

export type Tag = {
    id: string;
    name: string;
};

export type TagDetailsDto = Tag & {
    isActive: boolean
}