namespace DmitrySundeevBirdAdapter
{
    partial class Form1
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            this.DataGridViewBirds = new System.Windows.Forms.DataGridView();
            this.btRefresh = new System.Windows.Forms.Button();
            this.btSave = new System.Windows.Forms.Button();
            this.btDelete = new System.Windows.Forms.Button();
            ((System.ComponentModel.ISupportInitialize)(this.DataGridViewBirds)).BeginInit();
            this.SuspendLayout();
            // 
            // DataGridViewBirds
            // 
            this.DataGridViewBirds.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            this.DataGridViewBirds.Location = new System.Drawing.Point(28, 38);
            this.DataGridViewBirds.Name = "DataGridViewBirds";
            this.DataGridViewBirds.Size = new System.Drawing.Size(846, 395);
            this.DataGridViewBirds.TabIndex = 0;
            // 
            // btRefresh
            // 
            this.btRefresh.Location = new System.Drawing.Point(55, 456);
            this.btRefresh.Name = "btRefresh";
            this.btRefresh.Size = new System.Drawing.Size(122, 23);
            this.btRefresh.TabIndex = 1;
            this.btRefresh.Text = "Refresh";
            this.btRefresh.UseVisualStyleBackColor = true;
            this.btRefresh.Click += new System.EventHandler(this.btRefresh_Click);
            // 
            // btSave
            // 
            this.btSave.Location = new System.Drawing.Point(390, 456);
            this.btSave.Name = "btSave";
            this.btSave.Size = new System.Drawing.Size(135, 23);
            this.btSave.TabIndex = 2;
            this.btSave.Text = "Save";
            this.btSave.UseVisualStyleBackColor = true;
            this.btSave.Click += new System.EventHandler(this.btSave_Click);
            // 
            // btDelete
            // 
            this.btDelete.Location = new System.Drawing.Point(706, 456);
            this.btDelete.Name = "btDelete";
            this.btDelete.Size = new System.Drawing.Size(147, 23);
            this.btDelete.TabIndex = 3;
            this.btDelete.Text = "Delete Selected";
            this.btDelete.UseVisualStyleBackColor = true;
            this.btDelete.Click += new System.EventHandler(this.btDelete_Click);
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(901, 519);
            this.Controls.Add(this.btDelete);
            this.Controls.Add(this.btSave);
            this.Controls.Add(this.btRefresh);
            this.Controls.Add(this.DataGridViewBirds);
            this.Name = "Form1";
            this.Text = "Form1";
            this.Load += new System.EventHandler(this.Form1_Load);
            ((System.ComponentModel.ISupportInitialize)(this.DataGridViewBirds)).EndInit();
            this.ResumeLayout(false);

        }

        #endregion

        private System.Windows.Forms.DataGridView DataGridViewBirds;
        private System.Windows.Forms.Button btRefresh;
        private System.Windows.Forms.Button btSave;
        private System.Windows.Forms.Button btDelete;
    }
}

