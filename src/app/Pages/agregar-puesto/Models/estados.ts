export interface Puesto {
    name:string,
    description:string,
    category:string,
    street:string,
    no_house:string,
    colonia:string,
    municipio:string,
    estado:string,
    latitud:string,
    altitud:string,
    phone:string,
    idSeller: string,
    image:string
}

export interface Estados {
    nom_agee:string
}

export interface datos{
    Estados:Estados[];
}
/////////////////////////NUEVO

export interface Pais {
    country_name: string;
}

export interface Estado {
    state_name: string;
}

export interface Municipio {
    city_name: string;
}

