using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace DmitryDVD_Winter14.admin
{
    public partial class AddDVD : System.Web.UI.Page
    {
        private string ErrorString = "";

        protected void Page_Load(object sender, EventArgs e)
        {
            
        }

        protected void clearButton_Click(object sender, EventArgs e)
        {
            clearFields();
        }

        private void clearFields()
        {
            txtDVDtitle.Text = "";
            txtDVDartist.Text = "";
            txtDVDrating.Text = "";
            txtDVDprice.Text = "";
            txtDVDimg.Text = "";
            Image1.ImageUrl = "";
            dbErrorLabel.Text = "";
        }


        /// <summary>
        /// Error handling method, thow an error in case of converting problems from text to int (Raiting field)
        /// </summary>
        /// <param name="inputLine">string</param>
        /// <returns>int or throw exeptions</returns>
        private int Int32TryParse(string inputLine)
        {
            try {
                return Int32.Parse(inputLine);
            }
            catch (Exception ex)
            {
                ErrorString += "<strong>Raiting</strong> field value <strong>" + inputLine + "</strong> failed; string is not in a correct format; </br>";
                throw ex;
            }
        }

        /// <summary>
        /// Error handling method, thow an error in case of converting problems from text to double, for Price(money dataType) field
        /// </summary>
        /// <param name="inputLine"></param>
        /// <returns></returns>
        private double DoubleTryParse(string inputLine)
        {
            try
            {
                return Double.Parse(inputLine);
            }
            catch (Exception ex)
            {
                ErrorString += "<strong>Price</strong> field value <strong>" + inputLine + "</strong> failed; string is not in a correct format; </br>";
                throw ex;
            }
        }


        protected void btnAdd_Click(object sender, EventArgs e)
        {
            if (Page.IsValid)
            {

                SqlConnection conn;
                SqlCommand comm;
                string connectionString = ConfigurationManager.ConnectionStrings["DVDconnstring"].ConnectionString;
                conn = new SqlConnection(connectionString);
                comm = new SqlCommand("insert into DVDtable (DVDtitle, DVDartist, DVDrating, DVDprice, DVDimg) " +
                                        "values (@DVDtitle, @DVDartist, @DVDrating, @DVDprice, @DVDimg)", conn);
                comm.Parameters.Add("@DVDtitle", System.Data.SqlDbType.NVarChar, 100).Value = txtDVDtitle.Text;
                comm.Parameters.Add("@DVDartist", System.Data.SqlDbType.NVarChar, 100).Value = txtDVDartist.Text;
                comm.Parameters.Add("@DVDimg", System.Data.SqlDbType.NVarChar, 150).Value = txtDVDimg.Text;

                try
                {
                    //if ((txtDVDtitle.Text == "") || (txtDVDartist.Text == ""))
                    //{
                    //    ErrorString += "Title or Artist are reuired fields";
                    //    throw new System.ArgumentException("Parameter cannot be null", "original");
                    //}

                    comm.Parameters.Add("@DVDrating", System.Data.SqlDbType.Int).Value = Int32TryParse(txtDVDrating.Text); //Convert.ToInt32(txtDVDrating.Text);
                    comm.Parameters.Add("@DVDprice", System.Data.SqlDbType.Money).Value = DoubleTryParse(txtDVDprice.Text); //Convert.ToDouble(txtDVDprice.Text);

                    conn.Open();
                    comm.ExecuteNonQuery();

                    clearFields();
                }
                catch
                {
                    dbErrorLabel.Text = "Error Adding to DVD Table! <br />" + ErrorString;
                }
                finally
                {
                    conn.Close();
                }
            }
            
        }

        protected void txtDVDimg_TextChanged(object sender, EventArgs e)
        {
            
        }

        protected void btnImg_Click(object sender, EventArgs e)
        {
            Image1.ImageUrl = txtDVDimg.Text;
        }

        protected void btnLogout_Click(object sender, EventArgs e)
        {
            FormsAuthentication.SignOut();
            Response.Redirect("../home.aspx");
        }
    }
}