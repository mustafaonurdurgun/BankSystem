using Microsoft.AspNetCore.Mvc;
using Web.Controllers.Base;

namespace Web.Controllers
{
    [ApiController]
    [Route("api/[controller]/[action]")]
    public class ImageController : BaseController
    {
        private readonly string uploadFolderPath = "profile-images"; // Resimlerin kaydedileceği klasörü belirtin

        [HttpPost]
        public async Task<IActionResult> UploadImage(IFormFile file)
        {
            try
            {
                if (file == null || file.Length == 0)
                {
                    return BadRequest("Geçersiz dosya.");
                }

                // Resim dosyasının adını ve yolunu oluşturun
                var uniqueFileName = file.FileName;
                var filePath = Path.Combine(uploadFolderPath, uniqueFileName);

                // Eski resmin varlığını kontrol edin ve varsa silin
                if (System.IO.File.Exists(filePath))
                {
                    System.IO.File.Delete(filePath);
                }

                // Resim dosyasını sunucuya kaydedin
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }

                // Resmin yolu veya adı ile istemciye yanıt gönderin
                return Ok(new { imagePath = filePath }); // İstediğiniz diğer bilgileri de ekleyebilirsiniz
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Sunucu hatası: {ex.Message}");
            }
        }

        [HttpGet]
        public IActionResult GetImage(string resimKimlik)
        {
            // resimKimlik kullanarak ilgili resmi klasörden bulun ve istemciye döndürün
            try
            {
                string resimYolu = Path.Combine("profile-images", resimKimlik);
                byte[] resimBytes = System.IO.File.ReadAllBytes(resimYolu);
                return File(resimBytes, "image/jpeg"); // Resim türünü uygun şekilde ayarlayın
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Sunucu hatası: {ex.Message}");
            }
        }
    }
}
