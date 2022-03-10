using Microsoft.AspNetCore.Hosting;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace Wordle.Service
{
    public class WordReaderService
    {
        private readonly IWebHostEnvironment _Environment;
        public WordReaderService(IWebHostEnvironment environment)
        {
            _Environment = environment;
        }
        public string GetRandomWord(ref int level)
        {
            if (level < 4)
            {
                level = 4;
            }
            if(level > 9)
            {
                level = 9;
            }
            var path = Path.Combine(_Environment.WebRootPath, $"datasource/{level}.txt");
            var lines = File.ReadAllLines(path);
            var index = new Random().Next(lines.Length - 1);
            return lines[index].ToUpper();
        }
    }
}
