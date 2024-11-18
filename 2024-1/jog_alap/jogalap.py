import random
import json
import os
import customtkinter as ctk
from tkinter import messagebox

# Ezen gyönyörű spagetti Heki műve 

# A kédéssor fulep dani úr oldaláról van: https://fulepdani.web.elte.hu/2felev/jog.html

KERDES_FAJL = "text.txt"
HALADAS_FAJL = "progress.json"
ablaknevek_lista = ["Itt repül a repülő!", "Meg fogok bukni funkc progból xD", "Szia uram! Bojler eladó!", 
                    "Milfs in your area looking to have fun...", "Nem tudom mit írjak ide.", "bruh", "Help, meg fogok őrülni", 
                    "What if i can just *yoink*, i got your nose Voldemort!", "I hate League Of Legends", "Wanna play 5D Chess?",
                    "Hangin' out like Sayori does", "Chipi-chipi, chapa-chapa, Dubi-dubi, daba-daba", "Elegem van a jog alapból xd", 
                    "Valaki mentsen meg pls", "Másfél óra","HHahahaa hahaha skibidi hahaha","Én matek ZH után: Extreme PTSD",
                    "Most akkora meccset megyek hogy nem is sebeztek rám -Bantendo","mATX != ATX, igaz Levi?",
                    "Földet rá! Mit mondtáá!? Nem értettem jóól?","Gyakorolgatunk-gyakorolgatunk?"]


class QuizApp(ctk.CTk):
    def __init__(self):
        super().__init__()

        self.title(random.choice(ablaknevek_lista))        
        self.geometry("1000x510")
        self.tema_eppen = "dark"
        ctk.set_appearance_mode(self.tema_eppen)

        self.kerdesek = self.betolt_kerdesek()
        if not self.kerdesek:  
            messagebox.showerror("Hiba", "Nem található érvényes kérdés a fájlban.")
            self.destroy()
            return

        self.haladas = self.betolt_haladas()
        self.helyes_valaszok = 0
        self.aktualis_kerdes = None
        self.felvetelt_kerdesek = set()

        self.setup_ui()

    def setup_ui(self):
        self.fo_frame = ctk.CTkFrame(self)
        self.fo_frame.pack(fill="both", expand=True)

        self.fejezet_frame = ctk.CTkFrame(self.fo_frame)
        self.fejezet_frame.pack(fill="x", pady=10)
        
        self.szamlalo_label = ctk.CTkLabel(self.fejezet_frame, text="Helyes válaszok: 0", font=("Arial", 14))
        self.szamlalo_label.grid(row=0, column=0, padx=10, sticky="w")

        self.tema_gomb = ctk.CTkButton(self.fejezet_frame, text="Világosra váltás", command=self.valtas_temara)
        self.tema_gomb.grid(row=0, column=2, padx=10, sticky="e")

        self.progress_bar = ctk.CTkProgressBar(self.fejezet_frame, width=500, height=15)
        self.progress_bar.set(0) 
        self.progress_bar.grid(row=0, column=1, padx=20)

        self.fejezet_frame.grid_columnconfigure(0, weight=1)
        self.fejezet_frame.grid_columnconfigure(1, weight=0)
        self.fejezet_frame.grid_columnconfigure(2, weight=1)

        self.kerdes_frame = ctk.CTkFrame(self.fo_frame)
        self.kerdes_frame.pack(pady=10, padx=10, fill="both", expand=True)

        self.kerdes_label = ctk.CTkLabel(self.kerdes_frame, text="", font=("Arial", 16), wraplength=900)
        self.kerdes_label.pack(pady=20)

        self.valasz_gombok = []
        for i in range(4):
            btn = ctk.CTkButton(self.kerdes_frame, text="", command=lambda i=i: self.ellenorzes_valasz(i))
            btn.pack(fill="x", padx=20, pady=5)
            self.valasz_gombok.append(btn)

        self.lablec_frame = ctk.CTkFrame(self.fo_frame)
        self.lablec_frame.pack(fill="x", pady=10)

        self.menugomb = ctk.CTkButton(self.lablec_frame, text="Menü", fg_color="blue", command=self.megjelenit_menu)
        self.menugomb.pack(side="left", padx=10)

        self.kilepes_gomb = ctk.CTkButton(self.lablec_frame, text="Kilépés", fg_color="red", command=self.mentes_es_kilepes)
        self.kilepes_gomb.pack(side="right", padx=10)

        self.kovetkezo_gomb = ctk.CTkButton(self.lablec_frame, text="Következő kérdés", fg_color="green", command=self.kovetkezo_kerdes)
        self.kovetkezo_gomb.pack(side="right", padx=10)

        self.elindit_kviz()

    def betolt_kerdesek(self):
        with open(KERDES_FAJL, "r", encoding="utf-8") as f:
            sorok = f.read().strip().split("\n")
        kerdesek = []
        for i in range(0, len(sorok), 5):
            try:
                kerdes_szoveg = sorok[i].strip()
                valaszok = sorok[i+1:i+5]
                helyes = sorok[i+5].strip()
                if len(valaszok) == 4 and helyes in "ABCD":
                    kerdesek.append((kerdes_szoveg, valaszok, helyes))
            except:
                pass
        return kerdesek

    def betolt_haladas(self):
        if os.path.exists(HALADAS_FAJL):
            with open(HALADAS_FAJL, "r") as f:
                return json.load(f)
        return {}

    def mentes_haladas(self):
        with open(HALADAS_FAJL, "w") as f:
            json.dump(self.haladas, f)

    def valtas_temara(self):
        if self.tema_eppen == "light":
            self.tema_eppen = "dark"
            ctk.set_appearance_mode(self.tema_eppen)
            self.tema_gomb.configure(text="Világosra váltás", text_color="white")
            for btn in self.valasz_gombok:
                btn.configure(text_color="white")
        else:
            self.tema_eppen = "light"
            ctk.set_appearance_mode(self.tema_eppen)
            self.tema_gomb.configure(text="Sötétre váltás", text_color="black")
            for btn in self.valasz_gombok:
                btn.configure(text_color="black")

    def elindit_kviz(self):
        self.helyes_valaszok = 0
        self.felvetelt_kerdesek.clear()
        self.kovetkezo_kerdes()

    def kovetkezo_kerdes(self):
        if len(self.felvetelt_kerdesek) >= 20:
            self.eredmeny_megjelenites()
            return

        megmaradt_kerdesek = [
            q for q in self.kerdesek if str(self.kerdesek.index(q)) not in self.haladas or self.haladas[str(self.kerdesek.index(q))] < 3
        ]
        if not megmaradt_kerdesek:
            messagebox.showinfo("Kész", "Már minden kérdést megtanultál!")
            return

        self.aktualis_kerdes = random.choice([
            q for q in megmaradt_kerdesek if str(self.kerdesek.index(q)) not in self.felvetelt_kerdesek
        ])
        self.felvetelt_kerdesek.add(str(self.kerdesek.index(self.aktualis_kerdes)))

        self.ui_frissites_kerdeshez()

    def ui_frissites_kerdeshez(self):
        kerdes_szoveg, valaszok, _ = self.aktualis_kerdes
        self.kerdes_label.configure(text=kerdes_szoveg)

        for i, valasz in enumerate(valaszok):
            self.valasz_gombok[i].configure(text=valasz, fg_color="transparent", state="normal")

        progress = len(self.felvetelt_kerdesek) / 20
        self.progress_bar.set(progress)

    def ellenorzes_valasz(self, valasztott_index):
        helyes_index = ["A", "B", "C", "D"].index(self.aktualis_kerdes[2])
        for i, btn in enumerate(self.valasz_gombok):
            btn.configure(state="disabled")
            if i == helyes_index:
                btn.configure(fg_color="green")
            elif i == valasztott_index:
                btn.configure(fg_color="red")

        if valasztott_index == helyes_index:
            self.helyes_valaszok += 1
            self.szamlalo_label.configure(text=f"Helyes válaszok: {self.helyes_valaszok}")
            self.haladas[str(self.kerdesek.index(self.aktualis_kerdes))] = self.haladas.get(str(self.kerdesek.index(self.aktualis_kerdes)), 0) + 1
        else:
            self.haladas[str(self.kerdesek.index(self.aktualis_kerdes))] = max(0, self.haladas.get(str(self.kerdesek.index(self.aktualis_kerdes)), 0) - 1)

    def megjelenit_menu(self):
        if not self.haladas:
            self.haladas = {}

        self.mentes_haladas()

        self.kerdes_frame.pack_forget()
        self.lablec_frame.pack_forget()

        elsajatitott_kerdesek = [
            (idx + 1, q[0]) for idx, q in enumerate(self.kerdesek) if self.haladas.get(str(idx), 0) >= 3
        ]

        title_label = ctk.CTkLabel(self.fo_frame, text=f"Elsajátított kérdések: {len(elsajatitott_kerdesek)}", font=("Arial", 16))
        title_label.pack(pady=10)

        menu_frame = ctk.CTkScrollableFrame(self.fo_frame)
        menu_frame.pack(fill="both", expand=True, padx=10, pady=10)

        for number, question in elsajatitott_kerdesek:
            item_label = ctk.CTkLabel(menu_frame, text=f"{number}. {question}", font=("Arial", 14), anchor="w")
            item_label.pack(fill="x", padx=10, pady=5)

        back_button = ctk.CTkButton(self.fo_frame, text="Vissza", command=self.vissza_ui, fg_color="green")
        back_button.pack(pady=10)

    def vissza_ui(self):
        for widget in self.fo_frame.winfo_children():
            widget.pack_forget()

        self.fejezet_frame.pack(fill="x", pady=10)
        self.szamlalo_label.grid(row=0, column=0, padx=10, sticky="w")
        self.tema_gomb.grid(row=0, column=2, padx=10, sticky="e")
        self.progress_bar.grid(row=0, column=1, padx=20)

        self.kerdes_frame.pack(pady=10, padx=10, fill="both", expand=True)
        self.lablec_frame.pack(fill="x", pady=10)

    def mentes_es_kilepes(self):
        self.mentes_haladas()
        self.destroy()

    def eredmeny_megjelenites(self):
        score_percentage = (self.helyes_valaszok / 20) * 100
        response = messagebox.askyesnocancel(
            "Eredmények",
            f"Az elért eredményed: {self.helyes_valaszok}/20 ({score_percentage:.1f}%)\n"
            "Szeretnéd folytatni?",
        )
        if response is True:
            self.elindit_kviz()
        elif response is False:
            self.mentes_es_kilepes()


if __name__ == "__main__":
    ctk.set_default_color_theme("dark-blue")
    app = QuizApp()
    app.mainloop()


# made by Heki 
# feel free to suffer with me on this beautiful day xd