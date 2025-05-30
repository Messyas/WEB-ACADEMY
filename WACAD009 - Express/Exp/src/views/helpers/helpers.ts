import { Prof, Tech } from "../../types/main"

export function listProfs(profs: Prof[]) {
    return `<ul>${profs.map((p) => `<li>${p.nome}</li>`).join("")}</ul>`;
}

export function listTechs(techs: Tech[]) {
    return `<ul>${techs.map((t) => `<li> Tecnologias: ${t.name} + ${t.type} + Usou node: ${t.poweredByNodejs}</li>`).join("")}</ul>`;
}