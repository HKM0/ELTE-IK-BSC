using System;
using System.Collections.Generic;

namespace Tozsde
{
    internal class Program
    {
        static void Main(string[] args)
        {
            string[] elsosor = Console.ReadLine().Split(' ');
            int N = int.Parse(elsosor[0]);
            int R = int.Parse(elsosor[1]);

            int ReszvenyekSzama = 0;
            int id = 0;
            int alaparAlso = 0;
            int alaparFelso = 0;
            int legkisebbEladas = 0;
            int legnagyobbEladas = 0;
            string[] tobbisor;
            bool ElsoReszveny = false;
            int minimumReszveny = 0;
            int minimumReszvenyNap = 0;
            bool Elsoe = false;
            bool Elsoe2 = false;
            int vesztesegNap = 0;
            int segedszum = 0;
            int vesztesegMax = 0;
            bool vesztesegVan = false;
            List<List<int>> matrix = new List<List<int>>();
            List<int> sor;
            List<int> idk = new List<int>();
            for (int i = 0; i < N; i++)
            {
                Elsoe = false;
                segedszum = 0;
                ReszvenyekSzama = int.Parse(Console.ReadLine());
                if (!ElsoReszveny && ReszvenyekSzama != 0)
                {
                    ElsoReszveny = true;
                    minimumReszveny = ReszvenyekSzama;
                    minimumReszvenyNap = i + 1;
                }
                else if(ReszvenyekSzama < minimumReszveny && ReszvenyekSzama != 0 && ElsoReszveny)
                {
                    minimumReszveny = ReszvenyekSzama;
                    minimumReszvenyNap = i + 1;
                }
                for (int j = 0; j < ReszvenyekSzama; j++)
                {
                    sor = new List<int>();
                    tobbisor = Console.ReadLine().Split(' ');
                    id = int.Parse(tobbisor[0]);
                    if(!idk.Contains(id))
                    {
                        idk.Add(id);    
                    }
                    alaparAlso = int.Parse(tobbisor[1]);
                    alaparFelso = int.Parse(tobbisor[2]);
                    legkisebbEladas = int.Parse(tobbisor[3]);
                    legnagyobbEladas = int.Parse(tobbisor[4]);
                    sor.Add(id);
                    sor.Add(alaparAlso);
                    sor.Add(alaparFelso);
                    sor.Add(legkisebbEladas);
                    sor.Add(legnagyobbEladas);
                    matrix.Add(sor);
                    segedszum += (alaparFelso - alaparAlso); 
                }
                if (segedszum < 0)
                {
                    segedszum = segedszum * -1;

                    if (!Elsoe2)
                    {
                        vesztesegVan = true;
                        Elsoe2 = true;
                        vesztesegNap = i + 1;
                        vesztesegMax = segedszum;
                    }
                    else
                    {
                        if (segedszum > vesztesegMax)
                        {
                            vesztesegMax = segedszum;
                            vesztesegNap = i + 1;
                        }
                    }
                }
            }
            Console.WriteLine("#");
            Console.WriteLine(R-idk.Count);
            Console.WriteLine("#");
            Console.WriteLine(minimumReszvenyNap);
            Console.WriteLine("#");

            idk.Sort();
            int segedmax = 0;
            int maxelter = 0;
            int minelter = 0;
            int minId = 0;
            Elsoe = false;
            bool ElsoeACiklusban = false;
            for (int i = 0; i < idk.Count; i++)
            {
                Elsoe = false;
                for (int j = 0; j < matrix.Count; j++)
                {
                    if (matrix[j][0] == idk[i])
                    {
                        segedmax = matrix[j][4] - matrix[j][3];
                        if (!Elsoe)
                        {
                            Elsoe = true;
                            maxelter = segedmax;
                        }
                        else
                        {
                            if(segedmax > maxelter)
                            {
                                maxelter = segedmax;
                            }
                        }
                    }
                }
                if(!ElsoeACiklusban)
                {
                    ElsoeACiklusban = true;
                    minelter = maxelter;
                    minId = idk[i];
                }
                else
                {
                    if (maxelter < minelter)
                    { 
                        minelter = maxelter;
                        minId = idk[i];
                    }
                }
            }    
            Console.WriteLine(minId);
            Console.WriteLine("#");
            for(int i = 0; i < matrix.Count; i++)
            {
                if (!(matrix[i][1] < matrix[i][2]) ) 
                {
                    if (idk.Contains(matrix[i][0]))
                    {
                        idk.Remove(matrix[i][0]);
                    }
                }
            }

            for(int i = 0; i < idk.Count; i++)
            {
                Console.WriteLine(idk[i]);
            }
            Console.WriteLine("#");
            if(!vesztesegVan)
            {
                Console.WriteLine("-1");
            }
            else
            {
                Console.WriteLine(vesztesegNap);
                Console.WriteLine(vesztesegMax);
            }
        }
    }
}