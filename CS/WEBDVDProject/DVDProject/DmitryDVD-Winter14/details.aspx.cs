using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace DmitryDVD_Winter14
{
    public partial class details : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {

            int dvdid = Convert.ToInt32(Request.QueryString["id"]);

            SqlConnection conn;
            SqlCommand comm;
            SqlDataReader reader;
            string connectionString = ConfigurationManager.ConnectionStrings["DVDconnstring"].ConnectionString;
            conn = new SqlConnection(connectionString);
            comm = new SqlCommand("select DVDtitle, DVDartist, DVDrating, FORMAT(DVDprice, 'C', 'en-us') AS 'DVDprice', DVDimg, DVDyear, DVDdecription from DVDtable where DVDID=@DVDID", conn);
            comm.Parameters.Add("@DVDID", System.Data.SqlDbType.Int);
            comm.Parameters["@DVDID"].Value = dvdid;
            try
            {
                conn.Open();
                reader = comm.ExecuteReader();
                if (reader.Read())
                {
                    txtDVDtitle.Text = reader["DVDtitle"].ToString();
                    txtDVDartist.Text = reader["DVDartist"].ToString();
                    txtDVDrating.Text = reader["DVDrating"].ToString();
                    txtDVDprice.Text = reader["DVDprice"].ToString();
                    txtDVDyear.Text = reader["DVDyear"].ToString();
                    txtDescription.Text = reader["DVDdecription"].ToString();

                    Image1.ImageUrl = reader["DVDimg"].ToString();
                }
                reader.Close();

            }
            catch
            {
                //dbErrorLabel.Text = "Error loading the employee details! < br />";
            }
            finally
            {
                conn.Close();
            }


        }
    }
}