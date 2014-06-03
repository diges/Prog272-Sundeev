using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Configuration;
using System.Linq;
using System.Web;
using System.Web.UI;
using System.Web.UI.WebControls;



namespace DmitryDVD_Winter14
{
    public partial class home : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            SqlConnection sqlCon;
            SqlCommand sqlCmd;
            SqlDataReader sqlReader;
            string sqlConnStr = ConfigurationManager.ConnectionStrings["DVDconnstring"].ConnectionString;
            sqlCon = new SqlConnection(sqlConnStr);
            sqlCmd = new SqlCommand("Select DVDID, DVDtitle, DVDartist, DVDrating, FORMAT(DVDprice, 'C', 'en-us') AS 'DVDprice',DVDimg from DVDtable", sqlCon);

            try
            {
                sqlCon.Open();
                sqlReader = sqlCmd.ExecuteReader();
                DVDDataList.DataSource = sqlReader;
                DVDDataList.DataBind();
                sqlReader.Close();

            }
            catch (Exception ex)  {
                //confirm('ERROR!');

            }
            finally  {
                sqlCon.Close();
            }

            
        }

        protected void DVDDataList_ItemCommand(object source, DataListCommandEventArgs e)
        {
            if (e.CommandName == "details")
            {
                Response.Redirect("details.aspx?id=" + e.CommandArgument);
            } else if (e.CommandName == "buyit")
            {
                Response.Redirect("buydvd.aspx?id=" + e.CommandArgument);
            }

        }

    }
}