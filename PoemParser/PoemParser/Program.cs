using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace PoemParser
{
    public class Program
    {
        public class PoemInfo
        {
            public string Title { get; set; }
            public List<LineInfo> Lines { get; set; }
        }

        public class LineInfo
        {
            public string Line { get; set; }
            public string Reference { get; set; }
        }

        static void Main(string[] args)
        {
            var directoryInfo = new DirectoryInfo("C:/Users/sehch/Documents/Poetry");
            var poemFiles = directoryInfo.GetFiles();
            foreach (var poemFile in poemFiles)
            {
                var poem = File.ReadAllText(poemFile.FullName);
                var parsedPoem = _parsePoem(poemFile.Name, poem);
                var poemFileName = poemFile.Name.Replace(" ", "");
                poemFileName = $"{poemFileName.First().ToString().ToLower()}{poemFileName.Substring(1)}";
                var outputFilePath = Path.Combine(Environment.GetFolderPath(Environment.SpecialFolder.DesktopDirectory), $@"unseen-glory\src\poems\{poemFileName}.js");
                File.WriteAllText(outputFilePath, parsedPoem);
                Console.WriteLine($"Output at {outputFilePath}.");
            }

            Console.ReadKey();
        }

        private static string _parsePoem(string title, string poem)
        {
            var lines = poem.Split('\n').Select(line => new LineInfo { Line = line }).ToList();

            var poemInfo = new PoemInfo
            {
                Title = title,
                Lines = lines,
            };

            var poemInfoSerialized = JsonConvert.SerializeObject(
                poemInfo,
                Formatting.Indented,
                new JsonSerializerSettings
                {
                    ContractResolver = new CamelCasePropertyNamesContractResolver(),                    
                });

            return $"export default {poemInfoSerialized}";
        }
    }
}
