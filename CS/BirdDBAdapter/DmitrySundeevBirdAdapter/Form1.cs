using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;
using ClassLibraryDB;


namespace DmitrySundeevBirdAdapter
{
    public partial class Form1 : Form
    {
        private DataSet brdDataset;

        public Form1()
        {
            InitializeComponent();
            
        }

        /// <summary>
        /// retrieves BirdsCount table  from db
        /// </summary>
        private void refresh()
        {
            try
            {
                brdDataset = BirdsData.GetBirdInfo();

                DataGridViewBirds.DataSource = brdDataset;
                DataGridViewBirds.DataMember = "BirdsCoun";

            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.Message);
            }
        }

        private void btRefresh_Click(object sender, EventArgs e)
        {
            refresh();
        }

        private void btSave_Click(object sender, EventArgs e)
        {
            try
            {
                
                int x = BirdsData.UpdateData(brdDataset);
                MessageBox.Show(x.ToString()+" row(s) has been changed");
            }
            catch (Exception ex)
            {
                MessageBox.Show(ex.ToString());
            }
        }

        private void Form1_Load(object sender, EventArgs e)
        {
            refresh();
        }


         private void btDelete_Click(object sender, EventArgs e)
        {
            DialogResult ds;

            int pointer = this.BindingContext[brdDataset, "BirdsCoun"].Position;
            //MessageBox.Show(pointer.ToString());

            ds = MessageBox.Show("Are you sure?\n The row with Index=" + DataGridViewBirds.SelectedRows[0].Index.ToString() + " will be deleted", "Confirm Deletion", MessageBoxButtons.YesNo);

            if (ds == DialogResult.Yes)
            {
                //brdDataset.Tables["BirdsCoun"].Rows[DataGridViewBirds.SelectedRows[0].Index].Delete();
                brdDataset.Tables["BirdsCoun"].Rows[pointer].Delete();
                
                BirdsData.UpdateData(brdDataset);
                refresh();

                

            }
            else
            {
                MessageBox.Show("Deletion cancaled!");
            }

        }



    }
}
