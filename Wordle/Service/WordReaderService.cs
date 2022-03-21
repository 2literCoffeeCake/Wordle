using Microsoft.AspNetCore.Hosting;
using System;
using System.IO;

namespace Wordle.Service
{
    public class WordReaderService
    {
        private readonly IWebHostEnvironment _Environment;
        private readonly int _MinLvel = 4;
        private readonly int _MaxLvel = 10;
        public WordReaderService(IWebHostEnvironment environment)
        {
            _Environment = environment;
        }
        public string GetRandomWord(ref int level)
        {
            if (level < _MinLvel)
            {
                level = _MinLvel;
            }
            if(level > _MaxLvel)
            {
                level = _MaxLvel;
            }
            var path = Path.Combine(_Environment.WebRootPath, $"datasource/{level}.txt");
            var lines = File.ReadAllLines(path);
            var index = new Random().Next(lines.Length - 1);
            return lines[index].ToUpper();
        }
    }
}
