from typing import Dict, List, Optional

class DFSGraph:
    def __init__(self, iranyitott: bool = False) -> None:
        self.graf: Dict[str, List[str]] = {}
        self.iranyitott: bool = iranyitott

        self.ido: int = 0
        self.szin: Dict[str, str] = {}
        self.eleresi_ido: Dict[str, Optional[int]] = {}
        self.befejezesi_ido: Dict[str, Optional[int]] = {}

    def el_hozzaad(self, u: str, v: str) -> None:
        self.graf.setdefault(u, [])
        self.graf.setdefault(v, [])
        self.graf[u].append(v)
        if not self.iranyitott:
            self.graf[v].append(u)

    def dfs(self) -> None:
        for csucs in self.graf:
            self.szin[csucs] = "feher"
            self.eleresi_ido[csucs] = None
            self.befejezesi_ido[csucs] = None

        print("=== MELYSEGI KERESES KEZD ===")
        for csucs in sorted(self.graf.keys()):
            if self.szin[csucs] == "feher":
                print(f"\nÚj feszítőfa indul innen: {csucs}")
                self._dfs_visit(csucs)
        print("\n=== MELYSEGI KERESES VEGE ===\n")

    def _dfs_visit(self, u: str) -> None:
        self.ido += 1
        self.eleresi_ido[u] = self.ido
        self.szin[u] = "szurke"
        print(f"{u} elerve (eleresi ido = {self.ido})")

        for v in sorted(self.graf[u]):
            if self.szin[v] == "feher":
                print(f"\t{u} → {v} (fa-el)")
                self._dfs_visit(v)
            elif self.szin[v] == "szurke":
                print(f"\t{u} → {v} (vissza-el)")
            else:
                print(f"\t{u} → {v} (elore/kereszt-el)")

        self.szin[u] = "fekete"
        self.ido += 1
        self.befejezesi_ido[u] = self.ido
        print(f"{u} befejezve (befejezesi ido = {self.ido})")


g1 = DFSGraph(iranyitott=False)
g1.el_hozzaad("A", "B")
g1.el_hozzaad("A", "C")
g1.el_hozzaad("B", "D")
g1.el_hozzaad("C", "E")

g1.dfs()
print("Eleresi idok:", g1.eleresi_ido)
print("Befejezesi idok:", g1.befejezesi_ido)

print("\n################\nmasodik teszt\n################")
g2 = DFSGraph(iranyitott=True)
g2.el_hozzaad("1", "2")
g2.el_hozzaad("2", "3")
g2.el_hozzaad("3", "1")
g2.el_hozzaad("3", "4")
g2.el_hozzaad("4", "5")

g2.dfs()
print("Eleresi idok:", g2.eleresi_ido)
print("Befejezesi idok:", g2.befejezesi_ido)
