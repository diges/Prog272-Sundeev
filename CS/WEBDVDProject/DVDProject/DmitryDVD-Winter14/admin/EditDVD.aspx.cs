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
    public partial class EditDVD : System.Web.UI.Page
    {
        protected void Page_Load(object sender, EventArgs e)
        {
            if (!IsPostBack)
            {
                LoadDVDList();
            }
        }

        protected void selectDVD_Click(object sender, EventArgs e)
        {
            SqlConnection conn;
            SqlCommand comm;
            SqlDataReader reader;
            string connectionString = ConfigurationManager.ConnectionStrings["DVDconnstring"].ConnectionString;
            conn = new SqlConnection(connectionString);
            comm = new SqlCommand("select DVDtitle, DVDartist, DVDrating, DVDprice, DVDimg from DVDtable where DVDID=@DVDID", conn);
            comm.Parameters.Add("@DVDID", System.Data.SqlDbType.Int);
            comm.Parameters["@DVDID"].Value = DVDList.SelectedItem.Value;
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
                    txtDVDimg.Text = reader["DVDimg"].ToString();
                    Image1.ImageUrl = reader["DVDimg"].ToString();
                }
                reader.Close();
                updateButton.Enabled = true;
                deleteButton.Enabled = true;

            }
            catch
            {
                dbErrorLabel.Text = "Error loading the employee details! < br />";
            }
            finally
            {
                conn.Close();
            }
        }

        private void LoadDVDList()
        {
            SqlConnection conn;
            SqlCommand comm;
            SqlDataReader reader;
            string connectionString = ConfigurationManager.ConnectionStrings["DVDconnstring"].ConnectionString;
            conn = new SqlConnection(connectionString);
            comm = new SqlCommand("select DVDID, DVDartist+' / '+ DVDtitle as DVDname from DVDtable", conn);
            try
            {
                conn.Open();
                reader = comm.ExecuteReader();
                DVDList.DataSource = reader;
                DVDList.DataValueField = "DVDID"; //  note the binding here so we can use the ID

                DVDList.DataTextField = "DVDname"; // but the part that shows is the user friendly name

                DVDList.DataBind();
                reader.Close();
            }
            catch
            {
                dbErrorLabel.Text = "Error loading the list of employees! <br />";
            }
            finally
            {
                conn.Close();
            }
            updateButton.Enabled = false;
            deleteButton.Enabled = false;
            txtDVDtitle.Text = "";
            txtDVDartist.Text = "";
            txtDVDrating.Text = "";
            txtDVDprice.Text = "";
            txtDVDimg.Text = "";
            Image1.ImageUrl = "";
            //dbErrorLabel.Text = "<br/>";
            
        }

        protected void updateButton_Click(object sender, EventArgs e)
        {
            SqlConnection conn;
            SqlCommand comm;
            string connectionString = ConfigurationManager.ConnectionStrings["DVDconnstring"].ConnectionString;
            conn = new SqlConnection(connectionString);
            comm = new SqlCommand("UPDATE DVDtable SET DVDtitle=@DVDtitle, DVDartist=@DVDartist, DVDrating=@DVDrating, DVDprice=@DVDprice, DVDimg=@DVDimg where DVDID=@DVDID", conn);
            comm.Parameters.Add("@DVDtitle", System.Data.SqlDbType.NVarChar, 100);
            comm.Parameters["@DVDtitle"].Value = txtDVDtitle.Text;
            comm.Parameters.Add("@DVDartist", System.Data.SqlDbType.NVarChar, 100);
            comm.Parameters["@DVDartist"].Value = txtDVDartist.Text;
            comm.Parameters.Add("@DVDrating", System.Data.SqlDbType.Int);
            comm.Parameters["@DVDrating"].Value = Convert.ToInt32(txtDVDrating.Text);
            comm.Parameters.Add("@DVDprice", System.Data.SqlDbType.Money);
            comm.Parameters["@DVDprice"].Value = Convert.ToDouble(txtDVDprice.Text);
            comm.Parameters.Add("@DVDimg", System.Data.SqlDbType.NVarChar, 150);
            comm.Parameters["@DVDimg"].Value = txtDVDimg.Text;
            comm.Parameters.Add("@DVDID", System.Data.SqlDbType.Int);
            comm.Parameters["@DVDID"].Value = DVDList.SelectedItem.Value; 
           
            try
            {
                conn.Open();
                comm.ExecuteNonQuery();
                //dbErrorLabel.Text = "Update succeed! <br/>";
            }
            catch
            {
                dbErrorLabel.Text = "Error updating the DVDtable details! <br/>";
            }
            finally
            {
                conn.Close();
            }

            LoadDVDList();
        }

        protected void deleteButton_Click(object sender, EventArgs e)
        {
            SqlConnection conn;
            SqlCommand comm;
            string connectionString = ConfigurationManager.ConnectionStrings["DVDconnstring"].ConnectionString;
            conn = new SqlConnection(connectionString);
            comm = new SqlCommand("DELETE FROM DVDtable where DVDID=@DVDID", conn);
            comm.Parameters.Add("@DVDID", System.Data.SqlDbType.Int);
            comm.Parameters["@DVDID"].Value = DVDList.SelectedItem.Value; 
            try
            {
                conn.Open();
                comm.ExecuteNonQuery();
            }
            catch
            {
                dbErrorLabel.Text = "Error deleting DVD Table! <br />";
            }
            finally
            {
                conn.Close();
            }
            LoadDVDList();
        }

        protected void btnAdd_Click(object sender, EventArgs e)
        {
            
            Response.Redirect("AddDVD.aspx");

        }

        protected void btnLogout_Click(object sender, EventArgs e)
        {
            FormsAuthentication.SignOut();
            Response.Redirect("../home.aspx");
        }


    }
}