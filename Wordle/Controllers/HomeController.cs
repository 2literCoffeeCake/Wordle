using Microsoft.AspNetCore.Mvc;
using Wordle.Models;
using Wordle.Service;

namespace Wordle.Controllers
{
    public class HomeController : Controller
    {
        private WordReaderService _WordReaderService;

        public HomeController(WordReaderService wordReaderService)
        {
            _WordReaderService = wordReaderService;
        }

        [Route("/")]
        public IActionResult Index()
        {
            int level = 5;
            var word = _WordReaderService.GetRandomWord(ref level);
            var data = new Info
            {
                Word = word,
                Level = level
            };
            return PartialView(data);
        }

        [Route("/{level?}")]
        public IActionResult Index(int level)
        {
            var word = _WordReaderService.GetRandomWord(ref level);
            var data = new Info 
            { 
                Word = word,
                Level = level
            };
            return PartialView(data);
        }
    }
}
