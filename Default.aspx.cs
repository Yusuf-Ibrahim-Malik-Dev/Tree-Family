using System;
using System.Web.UI;

namespace TreeFamily
{
    /// <summary>
    /// Halaman utama aplikasi Tree Family.
    /// UI dan interaksi pohon keluarga tetap dijalankan oleh HTML, CSS, dan JavaScript
    /// agar fitur drag, relasi, ekspor, modal, serta animasi asli tetap berfungsi.
    /// </summary>
    public partial class Default : Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            // Memastikan respons HTML dikirim menggunakan UTF-8 agar karakter Unicode terbaca.
            Response.ContentEncoding = System.Text.Encoding.UTF8;
            Response.Charset = "utf-8";
        }
    }
}
