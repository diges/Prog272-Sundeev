using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Security;
using System.Web.UI;
using System.Web.UI.WebControls;

namespace DmitryDVD_Winter14.admin
{
    public partial class reports : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {

                loadClientListComboBox();
            }
            
        }

        private void loadClientListComboBox()
        {
            SqlConnection conn;
            SqlCommand comm;
            SqlDataReader reader;
            string connectionString = ConfigurationManager.ConnectionStrings["DVDconnstring"].ConnectionString;
            conn = new SqlConnection(connectionString);
            comm = new SqlCommand("select CustomerID, FirstName+' '+LastName as Name from Customers", conn);
            try
            {
                conn.Open();
                reader = comm.ExecuteReader();
                dropListClients.DataSource = reader;
                dropListClients.DataValueField = "CustomerID"; 

                dropListClients.DataTextField = "Name"; 

                dropListClients.DataBind();
                reader.Close();
            }
            catch
            {
                //dbErrorLabel.Text = "Error loading the list of employees! <br />";
            }
            finally
            {
                conn.Close();
            }
        }

        protected void ButtonLogout_Click(object sender, EventArgs e)
        {
            FormsAuthentication.SignOut();
            Response.Redirect("../home.aspx");
        }

        protected void ButtonCustomers_Click(object sender, EventArgs e)
        {
            SqlConnection sqlCon;
            SqlCommand sqlCmd;
            SqlDataReader sqlReader;
            string sqlConnStr = ConfigurationManager.ConnectionStrings["DVDconnstring"].ConnectionString;
            sqlCon = new SqlConnection(sqlConnStr);
            sqlCmd = new SqlCommand("select CustomerID, FirstName, LastName from Customers", sqlCon);

            try
            {
                sqlCon.Open();
                sqlReader = sqlCmd.ExecuteReader();
                CustomerReport.DataSource = sqlReader;
                CustomerReport.DataBind();
                sqlReader.Close();

            }
            catch (Exception ex)
            {
                //confirm('ERROR!');

            }
            finally
            {
                sqlCon.Close();
            }

          

        }

        protected void OrdersButton_Click(object sender, EventArgs e)
        {
            SqlConnection sqlCon;
            SqlCommand sqlCmd;
            SqlDataReader sqlReader;
            string sqlConnStr = ConfigurationManager.ConnectionStrings["DVDconnstring"].ConnectionString;
            sqlCon = new SqlConnection(sqlConnStr);
            sqlCmd = new SqlCommand("select o.OrderID,o.CustomerID, od.DVDID, d.DVDtitle from Orders o join DVDsOrdered od " +
	                                    "on o.OrderID=od.OrderID"+
                                        " join DVDtable d on od.DVDID=d.DVDID", sqlCon);
            //sqlCmd.Parameters.Add("@CustomerID", System.Data.SqlDbType.Int).Value = Convert.ToInt32(CustNumTextbox.Text);

            try
            {
                sqlCon.Open();
                sqlReader = sqlCmd.ExecuteReader();
                OrdersReport.DataSource = sqlReader;
                OrdersReport.DataBind();
                sqlReader.Close();

            }
            catch (Exception ex)
            {
                //confirm('ERROR!');

            }
            finally
            {
                sqlCon.Close();
            }
        }

        protected void dropListClients_SelectedIndexChanged(object sender, EventArgs e)
        {
            
        }

        protected void btSelectedItem_Click(object sender, EventArgs e)
        {
            SqlConnection sqlCon;
            SqlCommand sqlCmd;
            SqlDataReader sqlReader;
            string sqlConnStr = ConfigurationManager.ConnectionStrings["DVDconnstring"].ConnectionString;
            sqlCon = new SqlConnection(sqlConnStr);
            sqlCmd = new SqlCommand("select o.OrderID,o.CustomerID, od.DVDID, d.DVDtitle from Orders o join DVDsOrdered od " +
                                        "on o.OrderID=od.OrderID" +
                                        " join DVDtable d on od.DVDID=d.DVDID WHERE o.CustomerID = @CustomerID", sqlCon);
            sqlCmd.Parameters.Add("@CustomerID", System.Data.SqlDbType.Int).Value = dropListClients.SelectedItem.Value;

            try
            {
                sqlCon.Open();
                sqlReader = sqlCmd.ExecuteReader();
                OrdersReport.DataSource = sqlReader;
                OrdersReport.DataBind();
                sqlReader.Close();

            }
            catch (Exception ex)
            {
                //confirm('ERROR!');

            }
            finally
            {
                sqlCon.Close();
            }
        }
    }
}